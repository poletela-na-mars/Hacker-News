import React from "react";
import {Link} from "react-router-dom";
import "./ErrorPage.css";

import Header from "../header/Header";
import Footer from "../footer/Footer";

//TODO: ErrorPage. Loader
const ErrorPage = () => {
    return (
        <>
            <div className="error-block">
                <Header page={`ARTICLE_PAGE`}/>
                    <div className="main-part">
                        <h1>Oops! It seems that something went wrong.</h1>
                        <p>You are on a non-existent page.
                            Perhaps it is outdated, has been deleted, or an incorrect
                            address has been entered in the address bar
                        </p>
                        <Link to={`/`}>Return to main page</Link>
                    </div>
                <Footer/>
            </div>
        </>
    );
};

export default ErrorPage;