import React from 'react';
import { connect } from 'react-redux';

import {arrOf100IdsNewStories, parseNews} from '../parseNews';

import Loader from '../Spinner/Spinner';
import Post from '../Post/Post';

import store from '../../store';

let firstTimeSub = true;

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

    updateStore = () => {
        this.parseFunc();
        //store.dispatch({ type: 'UPDATED' });
        console.log("Update Store"); // при каждом обращение к store будет выводить его значение
    }

    render() {
        let arr = this.state.arr;

        if (firstTimeSub) {
            store.subscribe(this.updateStore); // Подписываемся на вызов store
            const unsubscribe = store.subscribe(this.updateStore);
            unsubscribe();
            firstTimeSub = false;
        }

        return (
            !arr.length || arr.length !== 20 || !arrOf100IdsNewStories.length ? (
                //<span>Loading...</span>
                <div className="load">
                    <Loader></Loader>
                </div>
            ) : (
                <div className="news__feed">
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
