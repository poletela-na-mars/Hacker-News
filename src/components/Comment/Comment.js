import React from "react";
import "./Comment.scss";
import {parseCounter} from "./parseCounter";
import CommentTitle from "./CommentTitle";
import CommentInfo from "./CommentInfo";
import {parseComments} from "./parseComments";
import Loader from "../Spinner/Spinner";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: ""};
        this.state = {arr: 0};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("didUpd in Comment");
        console.log(this.state.wasClicked); //true - псле нажатия на стрелку для раскрытия

        if (this.state.wasClicked === true) {

        }
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

    onChangeComGl = (id) => {
        this.setState({wasClicked : id});
        console.log(this.state.wasClicked);
    }

    render() {
        let arr = this.state.arr;
        return (
            arr === 0 ? (
                    <div className="load">
                        <Loader/>
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
                                arr.map(({id, text, author, date, kids}) => (
                                    <div key={id}>
                                        <div className="comment" lang="eng">
                                            <CommentTitle author={author} date={date} kids={kids} id={id} onChangeComGl={this.onChangeComGl}/>
                                            <CommentInfo text={text}/>
                                        </div>
                                        <CondNestedUI kidsArr={kids} idParent={id} author={author} date={date}
                                                      kids={kids} id={id} text={text}/>
                                        {/*<div className="nested-comment">*/}
                                        {/*    <div className="comment" lang="eng">*/}
                                        {/*        <CommentTitle author={author} date={date}/>*/}
                                        {/*        <CommentInfo text={text}/>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
        );
    }
}

function CondNestedUI(props) {
    const kidsArr = props.kidsArr;
    const idParent = props.idParent;
    const author = props.author;
    const date = props.date;
    const kids = props.kids;
    const id = props.id;
    const text = props.text;
    if (kidsArr) {
        if ([kidsArr[0]].key) {
            return <NestedComUI kidsArr={kidsArr} idParent={idParent} author={author} ate={date}
                                kids={kids} id={id} text={text}/>;
        }
    }
}

function NestedComUI(props) {
    return (
        props.kids.map(({item}) => (
                <div key={item.id}>
                    <div className="nested-com">
                        <CommentTitle author={item.author} date={item.date} kids={item.kids}
                                      id={item.id}/>
                        <CommentInfo text={item.text}/>
                    </div>
                </div>
            )
        )
    );
}

export default Comment;