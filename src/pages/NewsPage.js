import React from "react";

import MinHeader from "../components/Header/MinHeader";
import Footer from "../components/Footer/Footer";
import ScrollTop from "../components/ScrollTop/ScrollTop";
import AboutNews from "../components/AboutNews/AboutNews";
import Comment from "../components/Comment/Comment";
import {useLocation} from "react-router-dom";

export default function NewsPage () {
    function useGetId () {
        const location = useLocation();
        const { newsPageProps } = location.state;
        return newsPageProps;
    }

    // render() {
    //     const id = this.state.id;
        return (
            <div className="news-page">
                <MinHeader sitename="Hacker News" />
                <ScrollTop />
                <AboutNews idNews={useGetId()} />
                <Comment  idNews={useGetId()} />
                <Footer />
            </div>
        )
    // }
}

// export default NewsPage;