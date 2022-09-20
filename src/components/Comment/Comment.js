import React from "react";
import "./Comment.scss";
import {parseCounter} from "./parseCounter";
import CommentTitle from "./CommentTitle";
import CommentInfo from "./CommentInfo";
import {comments, parseComments} from "./parseComments";
import Loader from "../Spinner/Spinner";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: "",
            arr: 0,
            wasClicked: 0,
            arrCom: 0,
        };
        // this.state = {arr: 0};
        // this.state = {arrCom: 0};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("didUpd in Comment");
        console.log(this.state.wasClicked);
        console.log(comments);
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
        this.setState({wasClicked: id});
        console.log(this.state.wasClicked);
        this.setState({arrCom: comments});
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
                            <p>
                                {this.state.counter}
                            </p>
                        </div>
                        <div className="comments">
                            {
                                arr.map(({id, text, author, date, kids, parent}) => (
                                    <div key={id}>
                                        <div className="comment" lang="eng">
                                            <CommentTitle author={author} date={date} kids={kids} id={id} parent={parent}
                                                          onChangeComGl={this.onChangeComGl}/>
                                            <CommentInfo text={text}/>
                                        </div>
                                        <CondNestedUI kidsArr={this.state.arrCom} idParent={this.state.wasClicked} author={author}
                                                      date={date}
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

    console.log(comments);
    if (kidsArr !== undefined && idParent === id) {
            return <NestedComUI kidsArr={kidsArr} idParent={idParent} author={author} date={date}
                                kids={kids} id={id} text={text}/>;
    }
}

function NestedComUI(props) {
    return (
        // props.kidsArr.map(({author, date, kids, id, text}) => (
        //     props.kidsArr.filter(obj => obj.idParent === wasClicked).map(obj => (
                props.kidsArr.map(obj => (
                <div key={obj.id}>
                    <div className="nested-com">
                        <CommentTitle author={obj.by} date={obj.time} kids={obj.kids}
                                      id={obj.id}/>
                        <CommentInfo text={obj.text}/>
                    </div>
                </div>
            )
        )
    );
}

export default Comment;