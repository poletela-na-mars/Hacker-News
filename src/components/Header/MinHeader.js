import React from "react";
import {Link} from "react-router-dom";

import "./Header.css";


function MinHeader (props) {
        return (
            <header className="header">
                <div className="container">
                    <Link to="/"
                          style={{textDecoration: 'none', color: 'inherit'}}><h1>{props.sitename}</h1></Link>
                </div>
            </header>
        );
}

export default MinHeader;
