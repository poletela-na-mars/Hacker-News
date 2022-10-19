import React from "react";
import {Route, Routes} from 'react-router-dom'
import {connect} from "react-redux";

import MainPage from "./components/main-page/MainPage";
import ArticlePage from "./components/article-page/ArticlePage";

import {AsyncOperation} from "./reducer/reducer";

const App = (props) => {
    const {getActiveArticle, getArticles} = props;
    const LoadingArticles = () => {
        getArticles();
        return <MainPage/>;
    };

    const LoadingArticle = () => {
        getActiveArticle(window.location.pathname.slice(1));
        return <ArticlePage/>
    };

    return (
        <Routes>
            <Route path="/" element={<LoadingArticles/>}/>
            <Route path="/:id" element={<LoadingArticle/>}/>
        </Routes>
    );
};

const mapDispatchToProps = (dispatch) => ({
    getActiveArticle: (articleId) => {
        dispatch(AsyncOperation.getActiveArticle(articleId));
    },
    getArticles: () => {
        dispatch(AsyncOperation.getArticles());
    }
});

export default connect(null, mapDispatchToProps)(App);