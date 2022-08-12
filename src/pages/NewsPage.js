import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/ScrollTop/ScrollTop';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="news-page">
                <Header sitename="Hacker News" onChange={this.onChange}></Header>
                <ScrollTop />

                <Footer></Footer>
            </div>
        )
    }

}

export default NewsPage;