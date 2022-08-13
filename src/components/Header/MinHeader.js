import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';


class MinHeader extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { updatedManually: true };
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <Link to="/"
                          style={{textDecoration: 'none', color: 'inherit'}}>{this.props.sitename}</Link>
                </div>
            </header>
        );
    }
}

export default MinHeader;
