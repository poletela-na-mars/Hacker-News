import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./pages/App";
import NewsPage from "./pages/NewsPage";
import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="news-page/:id" element={<NewsPage />} />
            </Routes>
        </Provider>
    </BrowserRouter>
);

