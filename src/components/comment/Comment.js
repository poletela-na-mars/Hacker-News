import React, {useState} from "react";

import {fixDate, createMarkup} from "../../utils";

const Comment = (props) => {
    const {comment} = props;
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [kidsCommentsParentId, setKidsCommentsParentId] = useState(-1);

    const getButtonElement = (comment) => {
        const id = comment.id;

        if ((!isButtonPressed) && (comment.hasOwnProperty(`kids`))) {
            return (
                <button className="comment-show-more-button" type="button" onClick={() => {
                    setKidsCommentsParentId(id);
                    setIsButtonPressed(true);
                }}>show more</button>
            );
        }
    };

    const getCommentBlock = (comment) => {
        return (
            <div className="comment-parent-block">
                {/*<div className="comment-title">*/}
                <div className="comment-title-container">
                    <p className="comment-item author"><span
                        className="blue-words">Author:</span>&ensp;{comment.by}&ensp;</p>
                    <p className="comment-item"><span
                        className="blue-words">Date:</span>&ensp;{fixDate(comment.time)}</p>
                    {/*</div>*/}
                </div>
                <div className="comment-info">
                    <p className="comment-item-text" dangerouslySetInnerHTML={createMarkup(comment.text)}></p>
                </div>
            </div>
        );
    };

    const getNestedComments = (comments) => {
        return comments.filter(it => (!it.hasOwnProperty(`deleted`)) && (!it.hasOwnProperty(`dead`))).map(it => {
            return (
                <div key={it.id} className="comment-item-block shadow-form nested-comment">
                    {getCommentBlock(it)}
                    {it.hasOwnProperty(`kids`) ? getNestedComments(it.kids) : null}
                </div>
            );
        });
    };

    const getNestedCommentElement = (id) => {
        if (kidsCommentsParentId === id) {
            const comments = comment.kids;
            return (
                <>
                    {getNestedComments(comments)}
                </>
            );
        }
    };

    const getParentCommentElement = (comment) => {
        return (
            <div className="comment-item-block shadow-form">
                {getCommentBlock(comment)}
                {getButtonElement(comment)}
                {getNestedCommentElement(comment.id)}
            </div>
        );
    };

    if ((!comment.hasOwnProperty(`deleted`)) && (!comment.hasOwnProperty(`dead`))) {
        return getParentCommentElement(comment);
    }
};

export default Comment;