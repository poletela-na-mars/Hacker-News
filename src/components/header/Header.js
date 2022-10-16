import React, {useState} from "react";
import "./Header.css";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {ActionCreator} from "../../reducer/action-creator";
import {Operation} from "../../reducer/reducer";

const Header = (props) => {
    const {
        changeActiveArticleLoadingStatus, dropActiveArticle,
        getArticles, changeCommentsLoadingStatus, activeArticleId, getActiveArticle,
        isCommentLoaded, refreshStatus, changeRefreshStatus, page, minimum
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
                    <div className="update_img"
                         onClick={() => {
                             setRefreshButtonToggleStatus(true);
                             getArticles();
                         }}/>
                );
            } else if (page === 'ARTICLE_PAGE') {
                return (
                    <div>
                        <div className="update_img"
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
        dispatch(Operation.getArticles());
    },
    changeCommentsLoadingStatus: (status) => {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
    getActiveArticle: (articleId) => {
        dispatch(Operation.getActiveArticle(articleId));
    },
    changeRefreshStatus: (status) => {
        dispatch(ActionCreator.changeRefreshStatus(status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);