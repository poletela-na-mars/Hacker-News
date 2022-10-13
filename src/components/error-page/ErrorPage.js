import React from "react";
import {Link} from "react-router-dom";

import Header from "../header/Header";

const ErrorPage = () => {
    return (
        <React.Fragment>
            <Header page={`ARTICLE_PAGE`}/>
            <div className="container">
                <div className="load">
                    <h1>Article does not exist</h1>
                    <Link to={`/`}>Return to main page</Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ErrorPage;