import React from "react";

const CommentInfo = ({text}) => {
    return (
        <div className="comment-info" dangerouslySetInnerHTML={{__html: text}}></div>
    )
};

export default CommentInfo;