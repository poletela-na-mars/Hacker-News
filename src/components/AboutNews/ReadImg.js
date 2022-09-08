import React from "react";

const ReadImg = ({url, href}) => {
    let flag = false;
    if (url !== undefined) {
        flag = true;
    }

    return (
        flag ?
            (
                <a target="_blank" href={href}
                   className="link__to__news__read">
                    <div className="read__img"></div>
                </a>
            ) : (
                <div className="read__img__grey"></div>
            )
    );
};

export default ReadImg;