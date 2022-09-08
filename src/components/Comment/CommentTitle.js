import React from "react";
import "./Comment.scss";
import {fixDate} from "../Post/fixDate";
import {parseNestedComments} from "./parseComments";

class CommentTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};
    }

// = ({author, date, kids, id, onChange}) => {

    onChangeCom = () => {
        this.setState({clicked: true});
        console.log(this.state.clicked);
        this.props.onChangeComGl(this.props.id);
    }

    render() {
        let flag = false;

        if (this.props.kids) {
            flag = true;
        }

        return (
            <div className="comment-title">
                <div className="container-for-title-and-nested">
                    <CondNested nested={flag} kidsArr={this.props.kids} idParent={this.props.id} onChangeCom={this.onChangeCom}/>
                    <div className="author-comment"><span
                        className="blue__words">Author:</span>&ensp;{this.props.author}&ensp;
                    </div>
                    <div className="date-comment"><span
                        className="blue__words">Date:</span>&ensp;{fixDate(this.props.date)}</div>
                </div>
                <br/>
            </div>
        )
    };
}

class CondNested extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};
    }

    onChange = () => {
        this.setState({clicked: true});
        console.log(this.state.clicked);
        this.props.onChangeCom();
    }

    render() {
        if (this.props.nested) {
            return <NestedImg kidsArr={this.props.kidsArr} idParent={this.props.idParent} onChange={this.onChange}/>;
        }
    }
}

class NestedImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wasClicked: false};
    }

    render() {
        return (
            <div className="nested-img" onClick={async (e) => {
                if (this.state.wasClicked) {
                    return false;
                }

                e.target.style.opacity = 0.5;
                this.setState({wasClicked: true});
                this.props.onChange();
                await parseNestedComments(this.props.kidsArr, this.props.idParent);
            }
            }
            ></div>
        );
    }
}

export default CommentTitle;