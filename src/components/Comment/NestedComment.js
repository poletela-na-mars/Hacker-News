import React from "react";
import "./Comment.scss";
import {parseCounter} from "./parseCounter";
import {parseComments} from "./parseComments";
import Loader from "../Spinner/Spinner";
import CommentTitle from "./CommentTitle";
import CommentInfo from "./CommentInfo";

class NestedComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: ""};
        this.state = {arr: 0};
    }

    componentWillMount() {
        parseCounter(this.props.idNews).then(value => this.setState({counter: value}));
        this.parseFunc();
    }

    parseFunc = () => {
        parseComments(this.props.idNews).then(response => {
            this.setState({
                arr: response
            });
        });
    }

    render() {
        let arr = this.state.arr;
        return (
            arr === 0 ? (
                    <div className="load">
                        <Loader />
                    </div>
                )
                :
                (
                    <div className="comment-section">
                        <div className="counter">
                            {this.state.counter}
                        </div>
                        <div className="comments">
                            {
                                arr.map(({id, text, author, date}) => (
                                    <div className="comment" key={id} lang="eng">
                                        <CommentTitle author={author} date={date}/>
                                        <CommentInfo text={text}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
        );
    }
}

export default NestedComment;