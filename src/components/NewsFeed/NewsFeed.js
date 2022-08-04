import React from 'react';
import { connect } from 'react-redux';

import {parseNews} from '../parseNews';
import Loader from '../Spinner/Spinner';
import Post from '../Post/Post';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {arr: 0};
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
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    parseFunc = () => {
        parseNews().then(response => {
            this.setState({
                arr: response
            });
        });
    }

    render() {
        let arr = this.state.arr;
        // if (this.props.update) {
        //     this.parseFunc();
        //     this.props.onChange(this.state.update);
        //     console.log("Дошло до NewsFeed");
        //     console.log(this.state.update);
        // }

        return (
            !arr.length || arr.length !== 20 || this.props.update ? (
                //<span>Loading...</span>
                <div className="load">
                    <Loader></Loader>
                </div>
            ) : (
                <div>
                    {
                        arr.map(({title, rating, author, date}, key) => (
                            <Post
                                key={key}
                                title={title}
                                rating={rating}
                                author={author}
                                date={date}
                            />
                        ))
                    }
                </div>
            )
        );
    }
}

/**
 * отправка maps в props
 **/
function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => { dispatch({type: "UPDATING", update}) }
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
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);

//export default NewsFeed;
