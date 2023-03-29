import React from "react";
import { Route, Routes } from 'react-router-dom'
import { connect } from "react-redux";

import { ArticlePage, MainPage, Footer } from "./components";

import { AsyncOperation } from "./reducer/reducer";

const App = (props) => {
    const { getCurrentArticle, getArticles } = props;
    const LoadingArticles = () => {
        getArticles();
        return <MainPage />;
    };

    const LoadingArticle = () => {
        getCurrentArticle(window.location.pathname.slice(1));
        return <ArticlePage />
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<LoadingArticles />} />
                <Route path="/:id" element={<LoadingArticle />} />
            </Routes>
            <Footer />
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    getCurrentArticle: (articleId) => {
        dispatch(AsyncOperation.getCurrentArticle(articleId));
    },
    getArticles: () => {
        dispatch(AsyncOperation.getArticles());
    }
});

export default connect(null, mapDispatchToProps)(App);