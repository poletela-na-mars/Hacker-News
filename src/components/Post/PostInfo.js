import React from "react";

import "./Post.css";
import {fixDate} from "./fixDate";

let PostInfo = ({rating, author, date}) => {
    return (
        <div className="post__info">
            <div className="rating"><span className="blue__words">Rating:</span>&ensp;{rating}
            </div>
            <div className="author"><span className="blue__words">Author:</span>&ensp;{author}
            </div>
            <div className="date"><span
                className="blue__words">Date:</span>&ensp;{fixDate(date)}</div>
        </div>
    )
};

export default PostInfo;
