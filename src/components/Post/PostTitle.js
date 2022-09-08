import React from "react";
import {Link} from "react-router-dom";

import "./Post.css";

const PostTitle = ({id, title}) => {
    return (
        <Link to={'/news-page/' + id} state={{newsPageProps: id}}
              style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="post__title"><h3>{title}</h3></div>
        </Link>
    )
};

export default PostTitle;
