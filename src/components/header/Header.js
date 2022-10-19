import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import "./Header.css";

import {ActionCreator} from "../../reducer/action-creator";
import {AsyncOperation} from "../../reducer/reducer";

const Header = (props) => {
    const {
        changeActiveArticleLoadingStatus, dropActiveArticle,
        getArticles, changeCommentsLoadingStatus,
        getActiveArticle, changeRefreshStatus, page, minimum,
        activeArticleId, isCommentLoaded, refreshStatus,
    } = props;
    const [refreshButtonToggled, setRefreshButtonToggleStatus] = useState(false);

    setTimeout(() => {
        setRefreshButtonToggleStatus(false);
        changeRefreshStatus(false);
    }, 3000);

    const renderHeaderControls = () => {
        if (!minimum) {
            if (page === `MAIN_PAGE`) {
                return (
                    <div
                        className={`update-img${(refreshButtonToggled || refreshStatus) ? ` update-img-animation` : ``}`}
                        onClick={() => {
                            setRefreshButtonToggleStatus(true);
                            getArticles();
                        }}/>
                );
            } else if (page === 'ARTICLE_PAGE') {
                return (
                    <div>
                        <div
                            className={`update-img${((refreshButtonToggled && !isCommentLoaded) || refreshStatus) ? ` update-img-animation` : ``}`}
                            onClick={() => {
                                setRefreshButtonToggleStatus(true);
                                changeCommentsLoadingStatus(false);
                                getActiveArticle(activeArticleId);
                            }}/>
                    </div>
                );
            }
        } else {
            return null;
        }
    };

    return (
        <>
            <header>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/`} onClick={() => {
                    dropActiveArticle();
                    changeActiveArticleLoadingStatus(false);
                }}>
                    <h1 className="header-h1">Hacker News</h1>
                </Link>
                {renderHeaderControls()}
            </header>
        </>
    );
};

const mapStateToProps = (state) => ({
    activeArticleId: state.activeArticleId,
    isCommentLoaded: state.isCommentLoaded,
    refreshStatus: state.refreshStatus
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveArticleLoadingStatus: (status) => {
        dispatch(ActionCreator.changeActiveArticleLoadingStatus(status));
    },
    dropActiveArticle: () => {
        dispatch(ActionCreator.dropActiveArticle());
    },
    getArticles: () => {
        dispatch(AsyncOperation.getArticles());
    },
    changeCommentsLoadingStatus: (status) => {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
    getActiveArticle: (articleId) => {
        dispatch(AsyncOperation.getActiveArticle(articleId));
    },
    changeRefreshStatus: (status) => {
        dispatch(ActionCreator.changeRefreshStatus(status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);