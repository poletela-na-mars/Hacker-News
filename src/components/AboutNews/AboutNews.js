import React from 'react';

class AboutNews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="about-news">
                <div className="title__backToFeed"><h2>{this.props.idNews}</h2></div>
                <div className="info__panel"></div>
            </div>
        );
    }
}

export default AboutNews;