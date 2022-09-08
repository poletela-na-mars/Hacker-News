import React from "react";
import "../index.css";
import {connect} from "react-redux";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollTop from "../components/ScrollTop/ScrollTop";
import NewsFeed from "../components/NewsFeed/NewsFeed";

function App() {
    return (
        <div className="app">
            <Header sitename="Hacker News"/>
            <ScrollTop />
            <NewsFeed />
            <Footer/>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => {
            dispatch({type: "UPDATED_MANUALLY", update})
        }
    };
}

function mapStateToProps(state) {
    return {
        update: state.update
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

