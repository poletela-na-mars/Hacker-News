import React from "react";
import "./AboutNews.css";
import {arrOfNewsObj} from "../parseNews";
import {Link} from "react-router-dom";
import {fixDate} from "../Post/fixDate";

function AboutNews(props) {
    return (
        <div className="about-news" lang="en">
            <div className="title__backToFeed">
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                    <div className="go__back__img"></div>
                </Link>
                <h5><a target="_blank" href={arrOfNewsObj.find(obj => obj.id === props.idNews).url}
                       className="link__to__news">{arrOfNewsObj.find(obj => obj.id === props.idNews).title}</a></h5>
            </div>
            <div className="info__panel">
                <a target="_blank" href={arrOfNewsObj.find(obj => obj.id === props.idNews).url}
                   className="link__to__news__read">
                    <div className="read__img"></div>
                </a>
                <div className="date__news"><span
                    className="blue__words">Date:</span>&ensp;{fixDate(arrOfNewsObj.find(obj => obj.id === props.idNews).date)}
                </div>
                <div className="author__news"><span
                    className="blue__words">Author:</span>&ensp;{arrOfNewsObj.find(obj => obj.id === props.idNews).author}
                </div>
            </div>
        </div>
    );
}

export default AboutNews;