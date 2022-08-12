import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

import {connect} from 'react-redux';
import store from '../../store';
import {Loaded} from '../NewsFeed/NewsFeed';

let l = new Loaded();

class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { updatedManually: true };
    }

    // componentDidMount() {
    //     parseNews().then(response => {
    //         this.setState({
    //             arr: response.arr
    //         });
    //     });
    // }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <Link to="/"
                          style={{textDecoration: 'none', color: 'inherit'}}>{this.props.sitename}</Link>
                    <div className="update__img" onClick={() => {
                        l.setLoadedMore(false);
                        store.dispatch({type: 'UPDATING'});
                        console.log(store.getState());
                    }}>
                    </div>
                </div>
            </header>
        );
    }
}

// export let updatedManually = false;

/**
 * отправка maps в props
 **/
function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => {
            dispatch({type: "UPDATING", update})
        }
    }
}

/**
 * maps передаёт свойство в props
 **/
function mapStateToProps(state) {
    return {
        update: state.update
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

//export default Header;
