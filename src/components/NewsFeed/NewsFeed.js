import React from "react";

import "../LoadMore/LoadMore.css";
import "../Post/Post.css";

import {arrStateNewStories, loadMore, parseNews} from "../parseNews";

import Loader from "../Spinner/Spinner";

import store from "../../store";
import PostTitle from "../Post/PostTitle";
import PostInfo from "../Post/PostInfo";

let firstTimeSub = true;

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {arr: 0};
        this.buttonLoadMore = React.createRef();
    }

    componentWillMount() {
        console.log("willMount in NewsFeed");
        this.parseFunc();
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.parseFunc();
            console.log("обновление");
        }, 60000);
        console.log("didMount in NewsFeed");
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("didUpd in NewsFeed");
        if (this.buttonLoadMore) {
            if (this.buttonLoadMore.disabled === true) loadedMore = true;
            console.log(`${loadedMore}, loadedMore`);
        }
    }

    parseFunc = () => {
        parseNews().then(response => {
            this.setState({
                arr: response
            });
        });
    }

    updateStore = () => {
        console.log(store.getState());
        this.parseFunc();
        console.log("Update Store");
    }

    render() {
        let arr = this.state.arr;

        if (firstTimeSub) {
            store.subscribe(this.updateStore);
            firstTimeSub = false;
        }

        return (
            !arr.length || arr.length < 50 || arrStateNewStories === false ? (
                <div className="load">
                    <Loader />
                </div>
            ) : (
                <div className="news-feed">
                    {
                        arr.map(({id, title, rating, author, date}) => (
                            <div className="post" key={id} lang="eng">
                                <PostTitle id={id} title={title} />
                                <PostInfo rating={rating} author={author} date={date} />
                            </div>
                        ))
                    }
                    <div className="load-more">
                        <div className="container-for-load-more">
                            <button className="load__more" ref={b => this.buttonLoadMore = b}
                                    disabled={false}
                                    onClick={(e) => {
                                        e.target.style.opacity = 0.5;
                                        this.buttonLoadMore.disabled = true;
                                        loadMore().then(response => {
                                            this.setState({
                                                arr: response
                                            });
                                        });
                                    }}></button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export let loadedMore = false;

export function Loaded() {
    this.setLoadedMore = function (flag) {
        loadedMore = flag;
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         updatePage: (update) => {
//             dispatch({type: "UPDATING", update})
//         }
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         update: state.update
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);

export default NewsFeed;