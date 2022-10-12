import React from "react";
import {Route, Routes} from 'react-router-dom'
import {connect} from "react-redux";

import MainPage from "./components/main-page/MainPage";
import ArticlePage from "./components/article-page/ArticlePage";
import {Operation} from "./reducer/reducer";

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
        dispatch(Operation.getActiveArticle(articleId));
    },
    getArticles: () => {
        dispatch(Operation.getArticles());
    }
});

export default connect(null, mapDispatchToProps)(App);