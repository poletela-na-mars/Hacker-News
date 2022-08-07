import React from 'react';
import './Header.css';
import {connect} from 'react-redux';
import store from '../../store';

class Header extends React.Component{
    constructor(props) {
        super(props);
        //this.state = { update: true };
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
                    {this.props.sitename}
                    <div className="update__img" onClick={() => { store.dispatch({ type: 'UPDATING' });
                        console.log(store.getState());
                    }}>
                    </div>
                </div>
            </header>
        );
    }
}

/**
 * отправка maps в props
 **/
function mapDispatchToProps(dispatch) {
    return {
        updatePage: (update) => { dispatch({type: "UPDATING", update}) }
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
