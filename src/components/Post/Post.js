import React from 'react';
import './Post.css';
import { fixDate } from './fixDate';

let Post = ({ title, rating, author, date }) => {
    return (
        <div className="post">
            <div className="post__title"><h3>{title}</h3></div>
            <div className="post__info">
                <br/>
                <span className="blue__words">Rating:</span>&ensp;{rating}&emsp;&emsp;
                <span className="blue__words">Author:</span>&ensp;{author}&emsp;&emsp;
                <span className="blue__words">Date:</span>&ensp;{fixDate(date)}
            </div>
        </div>
    );
};

export default Post;
