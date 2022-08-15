import React from "react";
import {Link} from "react-router-dom";

import "./Header.css";

import {connect} from "react-redux";
import store from "../../store";
import {Loaded} from "../NewsFeed/NewsFeed";

let l = new Loaded();

function Header (props) {
        return (
            <header className="header">
                <div className="container">
                    <Link to="/"
                          style={{textDecoration: 'none', color: 'inherit'}}>{props.sitename}</Link>
                    <div className="update__img" onClick={() => {
                        l.setLoadedMore(false);
                        props.updatePage(true);
                        console.log(store.getState());
                    }}>
                    </div>
                </div>
            </header>
        );
    }

function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => {
            dispatch({type: "UPDATED_MANUALLY", update})
        }
    }
}

function mapStateToProps(state) {
    return {
        update: state.update
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

