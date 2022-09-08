export const parseCounter = async (idNews) => {
    let url = "https://hacker-news.firebaseio.com/v0/item/" + idNews + ".json?print=pretty";
    let response = await fetch(url).catch(err => {
        console.log(err);
    });
    let json = await response.json();

    if (json.descendants === 1) {
        return `1 comment`
    } else {
        return `${json.descendants} comments`;
    }
};

