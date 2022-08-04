let arrOf100IdsNewStories = new Array(20);
let arrOf100IdsOldStories = new Array(20);

export async function parseNews() {
    arrOf100IdsNewStories.length = 0;
    let response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
        .catch(err => console.log(err));
    // .then(results => results.json())
    // .then(data => {
    //     for (let i = 0; i < 100; i++) {
    //         arrOf100IdsNewStories.push(data[i]);
    //     }
    //     alert('1 alert  ' + arrOf100IdsNewStories.length);
    // })
    // .catch(err => console.log(err));
    let json = await response.json();
    for (let i = 0; i < 20; i++) {
        arrOf100IdsNewStories.push(json[i]);
    }

    if ((arrOf100IdsOldStories[0] === arrOf100IdsNewStories[0]) && (!arrOf100IdsOldStories.length)) return;

    for (let i = 0; i < arrOf100IdsNewStories.length; i++) {
        //if ((arrOf100IdsOldStories[0] === arrOf100IdsNewStories[0]) && (!arrOf100IdsOldStories.length)) return;
        if (arrOf100IdsOldStories[0] !== arrOf100IdsNewStories[i] && arrOf100IdsOldStories[0] != null) {
            continue;
        }
        if (arrOf100IdsOldStories[0] === arrOf100IdsNewStories[i]) {
            for (let j = 0; j < i; j++) {
                arrOf100IdsOldStories.pop();
            }
            let newPart = arrOf100IdsNewStories.slice(0, i);
            arrOf100IdsOldStories.push(...newPart);
            break;
        } else {
            arrOf100IdsOldStories = arrOf100IdsNewStories;
            break;
        }
    }

    await fetchInfo();
    return arrOfNewsObj;
}

let arrOfNewsObj = [];

export async function fetchInfo() {
    arrOfNewsObj.length = 0;
    for (let i = 0; i < arrOf100IdsOldStories.length; i++) {
        let url = "https://hacker-news.firebaseio.com/v0/item/" + arrOf100IdsOldStories[i] + ".json?print=pretty";
        let response = await fetch(url).catch(err => console.log(err));
        // .then(results => results.json())
        // .then(data => {
        //     //let post = new PostCreation(data.id, data.title, data.score, data.by, data.time, data.url);
        //     arrOfNewsObj.push(new PostCreation(data.id, data.title, data.score, data.by, data.time, data.url));
        // })
        // .catch(err => console.log(err));
        let json = await response.json();
        arrOfNewsObj.push(new PostCreation(json.id, json.title, json.score, json.by, json.time));
    }
}

class PostCreation {
    constructor(id, title, rating, author, date, url) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.author = author;
        this.date = date;
        //this.url = url;
    }
}



