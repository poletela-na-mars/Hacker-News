import React, { useEffect } from "react";
import { connect } from "react-redux";

import Comment from "../comment/Comment";

import { ActionCreator } from "../../reducer/action-creator";
import { AsyncOperation } from "../../reducer/reducer";

const Comments = (props) => {
    const {articleComments, currentArticle, isEachCommentLoaded,
        getCurrentArticle, changeUpdateStatus, changeCommentsLoadingStatus} = props;

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            changeUpdateStatus(true);
            changeCommentsLoadingStatus(false);
            getCurrentArticle(currentArticle.id);
        }, 60000);

        return () => {
            clearInterval(refreshInterval);
        };
    });

    const getCommentsElements = (comments) => {
        return comments.map((it) => <Comment key={it.id} comment={it}/>);
    };

    return (
        <div className="comment-block">
            {isEachCommentLoaded ? getCommentsElements(articleComments) : null}
        </div>
    );
};

const mapStateToProps = (state) => ({
    articleComments: state.articleComments,
    isEachCommentLoaded: state.isEachCommentLoaded,
    currentArticle: state.currentArticle
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentArticle: (id) => {
        dispatch(AsyncOperation.getCurrentArticle(id));
    },
    changeUpdateStatus: (status) => {
        dispatch(ActionCreator.changeUpdateStatus(status));
    },
    changeCommentsLoadingStatus: (status) => {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);