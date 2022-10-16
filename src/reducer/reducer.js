import initialState from "./initial-state";
import {ActionType, ActionCreator} from "./action-creator";
import {getArticles, getCommentsTree, getArticle} from "../api";
import {createReducer} from "@reduxjs/toolkit";

const Operation = {
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

//TODO:
//      -change Operation
//      -delete props. in Comments
//      -configureStore in index.js

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

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ActionType.CHANGE_LOADING_STATUS:
//             return Object.assign({}, state, {
//                 isDataLoaded: action.payload
//             });
//
//         case ActionType.GET_ARTICLES:
//             return Object.assign({}, state, {
//                 articles: action.payload
//             });
//
//         case ActionType.CHANGE_ACTIVE_ARTICLE_ID:
//             return Object.assign({}, state, {
//                 activeArticleId: action.payload
//             });
//
//         case ActionType.GET_ARTICLE_COMMENTS:
//             return Object.assign({}, state, {
//                 articleComments: action.payload
//             });
//
//         case ActionType.CHANGE_COMMENTS_LOADING_STATUS:
//             return Object.assign({}, state, {
//                 isCommentLoaded: action.payload
//             });
//
//         case ActionType.GET_ACTIVE_ARTICLE:
//             return Object.assign({}, state, {
//                 activeArticle: action.payload
//             });
//
//         case ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS:
//             return Object.assign({}, state, {
//                 isActiveArticleLoaded: action.payload
//             });
//
//         case ActionType.DROP_ACTIVE_ARTICLE:
//             return Object.assign({}, state, {
//                 activeArticle: null
//             });
//
//         case ActionType.CHANGE_REFRESH_STATUS:
//             return Object.assign({}, state, {
//                 refreshStatus: action.payload
//             });
//         default:
//             return state;
//     }
// };

export {reducer, Operation};