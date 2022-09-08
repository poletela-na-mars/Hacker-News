let arrComments = [];

export const parseComments = async (idNews) => {
    arrComments.length = 0;
    // let url = "https://hacker-news.firebaseio.com/v0/item/" + idNews + ".json?print=pretty";
    // let response = await fetch(url).catch(err => {
    //     console.log(err);
    // });
    // let json = await response.json();
    const json = await getDataFromUrl(idNews);
    if ("kids" in json) {
        for (const item of json.kids) {
            // let url = "https://hacker-news.firebaseio.com/v0/item/" + item + ".json?print=pretty";
            // let response = await fetch(url).catch(err => {
            //     console.log(err);
            // });
            // let json = await response.json();
            const json = await getDataFromUrl(item);
            arrComments.push(new CommentCreation(json.id, json.text, json.by, json.time, json.kids));
        }

        console.log(arrComments);
        return arrComments;
    } else return [];
};

export const parseNestedComments = async (kidsArr, idParent) => {
    let comments = getCommentsTree(idParent).then(response => {
        console.log(response);
    });
};

class CommentCreation {
    constructor(id, text, author, date, kids) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.date = date;
        this.kids = kids;
    }
}

const getComments = async (ids) => {
    return await Promise.all(ids.map(async (id) => {
        // let url = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty";
        // let response = await fetch(url).catch(err => {
        //     console.log(err);
        // });
        // return await response.json();
        return await getDataFromUrl(id);
    }));
};

const getCommentsTree = async (id) => {
    const comments = [];

    // let url = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty";
    // let response = await fetch(url).catch(err => {
    //     console.log(err);
    // });
    // let json = await response.json();

    const json = await getDataFromUrl(id);

    if (!("kids" in json)) {
        return comments;
    } else {
        const commentsIdsKids = json.kids;
        const commentsChildren = await getComments(commentsIdsKids);
        commentsChildren.forEach(async (it) => {
            const sub = await deepSearch(it);
            comments.push(sub);
        });
    }

    return comments;
};

const deepSearch = async (comment) => {
    const result = Object.assign({}, comment);

    if ("kids" in result) {
        const kids = result.kids;
        const temp = [];

        kids.forEach(async (it) => {
            const comment = await getDataFromUrl(it);
            const newComment = await deepSearch(comment);
            temp.push(newComment);
        });
        result.kids = temp;
        return result;
    } else {
        return result;
    }
};

const getDataFromUrl = async (id) => {
    const url = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty";
    const response = await fetch(url).catch(err => {
        console.log(err);
    });
    return await response.json();
};

