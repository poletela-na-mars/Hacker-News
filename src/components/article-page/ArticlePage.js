import React from "react";
import {connect} from "react-redux";
import DOMPurify from 'dompurify';
import "./ArticlePage.css";

import Header from "../header/Header";
import Loader from "../loader/Loader";
import Comments from "../comments/Comments";
import ErrorPage from "../error-page/ErrorPage";

import {fixDate} from "../../utils";
import {ActionCreator} from "../../reducer/action-creator";
import ScrollTop from "../scroll-top/ScrollTop";
import Footer from "../footer/Footer";
import {Link} from "react-router-dom";

const ArticlePage = (props) => {
    const {
        activeArticle,
        isActiveArticleLoaded,
        changeActiveArticleId,
        changeActiveArticleLoadingStatus,
        dropActiveArticle
    } = props;

    if (isActiveArticleLoaded) {
        changeActiveArticleId(activeArticle.id);
        return (
            <div className="block">
                <Header page={`ARTICLE_PAGE`} minimum={false}/>
                <div className="main-part">
                    <div className="about-article">
                        <div className="article-panel">
                            <Link to={`/`} onClick={() => {
                                dropActiveArticle();
                                changeActiveArticleLoadingStatus(false);
                            }}>
                                <div className="go-back-button"/>
                            </Link>
                            <h1><a target="_blank" href={activeArticle.url}
                                   style={activeArticle.url ? {} : {color: "black"}}
                                   className="article-title">{activeArticle.title}</a></h1>
                        </div>
                        {activeArticle.text ? <p className="optional-text"
                                                 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(activeArticle.text)}}>
                        </p> : ""}
                        <div className="article-info shadow-form">
                            {activeArticle.url ?
                                <a target="_blank" href={activeArticle.url} className="read-button"></a> :
                                <div className="read-button-grey"/>}
                            <div className="article-date"><span
                                className="blue-words">Date:</span>&ensp;{fixDate(activeArticle.time)}
                            </div>
                            <div className="article-author"><span
                                className="blue-words">Author:</span>&ensp;{activeArticle.by}
                            </div>
                        </div>
                        <div className="comments-counter-container">
                            <p>{activeArticle.descendants ? (activeArticle.descendants === 1 ? `1 comment` : `${activeArticle.descendants} comments`) : `0 comments`}</p>
                        </div>
                    </div>
                    <Comments/>
                </div>
                <Footer/>
                <ScrollTop/>
            </div>
        );
    } else if (activeArticle === -1) {
        return <ErrorPage/>;
    } else {
        return (
            <div className="load-container">
                <div className="load">
                    <Loader/>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    activeArticle: state.activeArticle,
    isActiveArticleLoaded: state.isActiveArticleLoaded,

});

const mapDispatchToProps = (dispatch) => ({
    changeActiveArticleLoadingStatus: (status) => {
        dispatch(ActionCreator.changeActiveArticleLoadingStatus(status));
    },
    dropActiveArticle: () => {
        dispatch(ActionCreator.dropActiveArticle());
    },
    changeActiveArticleId: (articleId) => {
        dispatch(ActionCreator.changeActiveArticleId(articleId));
    }
});

export {ArticlePage};
export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);