import React from 'react';
import './App.css';
import './index.css';
import { connect } from 'react-redux';

import './components/scrollTopButton';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NewsFeed from './components/NewsFeed/NewsFeed';

import store from './store';

class App extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        //this.state = { update: false };
    }

    // handleChange(e) {
    //     this.setState({arr: arrOfNewsObj});
    // }

    // onChange = () => {
    //     this.setState(prevState => ({
    //         update: !prevState.update
    //     }));
    //     console.log("OnChange");
    //     console.log(this.state.update);
    // }

    // componentWillMount() {
    //     parseNews().then(response => {
    //         this.setState({
    //             arr: response
    //         });
    //     });
    // }

    componentDidMount() {
        // this.setState(prevState => ({
        //     update: !prevState.update
        // }));
        console.log("compDidMount in App");
        console.log(store.getState());
    }


    render() {
        //const arr = this.state.arr;
        return (
            <div className="app">
                {/*<Header sitename="Hacker News" onChange={this.onChange}></Header>*/}
                <Header sitename="Hacker News"></Header>
                <button title="Наверх" id="scroll_top"></button>
                <NewsFeed>
                {/*<NewsFeed onChange={this.onChange}>*/}
                {/*{!arr.length || arr.length !== 20 ? (*/}
                {/*    //<span>Loading...</span>*/}
                {/*    <div className="load">*/}
                {/*        <Loader></Loader>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    arr.map(({title, rating, author, date}, key) => (*/}
                {/*        <Post*/}
                {/*            key={key}*/}
                {/*            title={title}*/}
                {/*            rating={rating}*/}
                {/*            author={author}*/}
                {/*            date={date}*/}
                {/*        />*/}
                {/*    ))*/}
                {/*)}*/}
                </NewsFeed>
                <Footer></Footer>
            </div>
        );
    }
}

/**
 * отправка maps в props
 **/
function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => { dispatch({type: "UPDATING", update}) },
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
export default connect(mapStateToProps, mapDispatchToProps)(App);

//export default App;
