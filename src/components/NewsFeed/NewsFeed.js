import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import '../LoadMore/LoadMore.css';
import '../Post/Post.css';

import {arrStateNewStories, loadMore, parseNews} from '../parseNews';

import Loader from '../Spinner/Spinner';

import store from '../../store';
import {fixDate} from "../Post/fixDate";

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
        //this.props.onChange(this.state.arr);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.parseFunc();
            console.log("обновление");
            // this.props.onChange(this.state.arr);
        }, 60000);
        console.log("didMount in NewsFeed");
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("did Upd in NewsFeed");
        // loadedMore = !!this.buttonLoadMore.current.style.disabled;
        if (this.buttonLoadMore) {
            if (this.buttonLoadMore.disabled === true) loadedMore = true;
            // else {
            //     loadedMore = false;
            // }
            //loadedMore = !!this.buttonLoadMore.disabled;
            console.log(`${loadedMore}, loadedMore `);
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
        // if (store.getState() === {
        //     update: {
        //         updating: true
        //     }
        // } ) { console.log("проверка на if - load") };
        console.log(store.getState());
        this.parseFunc();
        //store.dispatch({ type: 'UPDATED' });
        console.log("Update Store");
    }

    render() {
        let arr = this.state.arr;

        if (firstTimeSub) {
            store.subscribe(this.updateStore); // Подписываемся на вызов store
            // const unsubscribe = store.subscribe(this.updateStore);
            // unsubscribe();
            firstTimeSub = false;
        }

        return (
            !arr.length || arr.length < 50 || arrStateNewStories === false ? (
                //<span>Loading...</span>
                <div className="load">
                    <Loader></Loader>
                </div>
            ) : (
                <div className="news-feed">
                    {
                        arr.map(({id, title, rating, author, date}) => (
                            // <Link to='/news-page' state={{ newsPageProps: id }} key={id} style={{textDecoration: 'none', color: 'inherit'}}>
                            // <Post
                            //     key={id}
                            //     title={title}
                            //     rating={rating}
                            //     author={author}
                            //     date={date}
                            // />
                            <div className="post" key={id}>
                                <Link to='/news-page' state={{newsPageProps: id}}
                                      style={{textDecoration: 'none', color: 'inherit'}}>
                                    <div className="post__title"><h3>{title}</h3></div>
                                </Link>
                                <div className="post__info">
                                    <div className="rating"><span className="blue__words">Rating:</span>&ensp;{rating}
                                    </div>
                                    <div className="author"><span className="blue__words">Author:</span>&ensp;{author}
                                    </div>
                                    <div className="date"><span
                                        className="blue__words">Date:</span>&ensp;{fixDate(date)}</div>
                                </div>
                            </div>
                            // </Link>
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

/**
 * отправка maps в props
 **/
function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => {
            dispatch({type: "UPDATING", update})
        }
    }
}

/**
 * maps передаёт свойство в props
 **/
function mapStateToProps(state) {
    return {
        update: state.update
    }
}

// const updateStore = () => {
//     this.parseFunc();
//     store.dispatch({ type: 'UPDATED' });
//     console.log(store.getState()); // при каждом обращение к store будет выводить его значение
// }

// function select(state) {
//     return state.update
// }
//
// let currentValue
// function handleChange() {
//     let previousValue = currentValue
//     currentValue = select(store.getState())
//
//     if (previousValue !== currentValue) {
//         console.log(
//             'Some deep nested property changed from',
//             previousValue,
//             'to',
//             currentValue
//         )
//     }
// }
//
// const unsubscribe = store.subscribe(handleChange);
// unsubscribe();

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);

//export default NewsFeed;
