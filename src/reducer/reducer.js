import initialState from "./initial-state";
import {ActionType, ActionCreator} from "./action-creator";
import {getArticles, getCommentsTree, getArticle} from "../api";
import {createReducer} from "@reduxjs/toolkit";

const AsyncOperation = {
    getArticles: () => async (dispatch) => {
        const articles = await getArticles();

        dispatch(ActionCreator.getArticles(articles));
        dispatch(ActionCreator.changeLoadingStatus(true));
    },
    getActiveArticle: (articleId) => async (dispatch) => {
        const article = await getArticle(articleId);
    
        if (article !== null) {
            const comments = await getCommentsTree(article);

            dispatch(ActionCreator.getActiveArticle(article));
            dispatch(ActionCreator.getArticleComments(comments));
            dispatch(ActionCreator.changeActiveArticleLoadingStatus(true));
            dispatch(ActionCreator.changeCommentsLoadingStatus(true));
        } else {
            dispatch(ActionCreator.getActiveArticle(-1));
        }
    }
};

//TODO: action creators/ initial state names?

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ActionType.CHANGE_LOADING_STATUS, (state, action) => {
            state.isDataLoaded = action.payload;
        })
        .addCase(ActionType.GET_ARTICLES, (state, action) => {
            state.articles = action.payload;
        })
        .addCase(ActionType.CHANGE_ACTIVE_ARTICLE_ID, (state, action) => {
            state.activeArticleId = action.payload;
        })
        .addCase(ActionType.GET_ARTICLE_COMMENTS, (state, action) => {
            state.articleComments = action.payload;
        })
        .addCase(ActionType.CHANGE_COMMENTS_LOADING_STATUS, (state, action) => {
            state.isCommentLoaded = action.payload;
        })
        .addCase(ActionType.GET_ACTIVE_ARTICLE, (state, action) => {
            state.activeArticle = action.payload;
        })
        .addCase(ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS, (state, action) => {
            state.isActiveArticleLoaded = action.payload;
        })
        .addCase(ActionType.DROP_ACTIVE_ARTICLE, (state, action) => {
            state.activeArticleId = null;
        })
        .addCase(ActionType.CHANGE_REFRESH_STATUS, (state, action) => {
            state.refreshStatus = action.payload;
        })
        .addDefaultCase((state, action) => {
            Object.assign(state, initialState);
        })
});

export {reducer, AsyncOperation};