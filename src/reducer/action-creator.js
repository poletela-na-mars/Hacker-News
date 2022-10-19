import {createAction} from "@reduxjs/toolkit";

const ActionType = {
    GET_ARTICLES: `GET_ARTICLES`,
    CHANGE_LOADING_STATUS: `CHANGE_LOADING_STATUS`,
    CHANGE_ACTIVE_ARTICLE_ID: `CHANGE_ACTIVE_ARTICLE_ID`,
    GET_ARTICLE_COMMENTS: `GET_ARTICLE_COMMENTS`,
    CHANGE_COMMENTS_LOADING_STATUS: `CHANGE_COMMENTS_LOADING_STATUS`,
    GET_ACTIVE_ARTICLE: `GET_ACTIVE_ARTICLE`,
    CHANGE_ACTIVE_ARTICLE_LOADING_STATUS: `CHANGE_ACTIVE_ARTICLE_LOADING_STATUS`,
    DROP_ACTIVE_ARTICLE: `DROP_ACTIVE_ARTICLE`,
    CHANGE_REFRESH_STATUS: `CHANGE_REFRESH_STATUS`
};

const ActionCreator = {
    getArticles: createAction(ActionType.GET_ARTICLES, payload => ({payload})),
    changeLoadingStatus: createAction(ActionType.CHANGE_LOADING_STATUS, payload => ({payload})),
    changeActiveArticleId: createAction(ActionType.CHANGE_ACTIVE_ARTICLE_ID, payload => ({payload})),
    getArticleComments: createAction(ActionType.GET_ARTICLE_COMMENTS, payload => ({payload})),
    changeCommentsLoadingStatus: createAction(ActionType.CHANGE_COMMENTS_LOADING_STATUS, payload => ({payload})),
    getActiveArticle: createAction(ActionType.GET_ACTIVE_ARTICLE, payload => ({payload})),
    changeActiveArticleLoadingStatus: createAction(ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS, payload => ({payload})),
    dropActiveArticle: createAction(ActionType.DROP_ACTIVE_ARTICLE, payload => ({payload})),
    changeRefreshStatus: createAction(ActionType.CHANGE_REFRESH_STATUS, payload => ({payload})),
};

export {ActionCreator, ActionType};