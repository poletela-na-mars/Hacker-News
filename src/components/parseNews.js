import { loadedMore } from "./NewsFeed/NewsFeed";
export let arrStateNewStories = false; //false - empty

let arrOf100IdsNewStories = new Array(100);
let arrOf100IdsOldStories = new Array(100);

const store = require('store');

export async function parseNews() {
    arrOf100IdsNewStories.length = 0;
    arrStateNewStories = false;
    let response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
        .catch(err => {
            console.log(err)
        });

    let json = await response.json();
    for (let i = 0; i < 100; i++) {
        arrOf100IdsNewStories.push(json[i]);
    }

    if ((arrOf100IdsOldStories[0] === arrOf100IdsNewStories[0]) && (!arrOf100IdsOldStories.length)) return;

    for (let i = 0; i < arrOf100IdsNewStories.length; i++) {
        if (arrOf100IdsOldStories[0] !== arrOf100IdsNewStories[i] && arrOf100IdsOldStories[0] != null) {
            continue;
        }
        if (arrOf100IdsOldStories[0] === arrOf100IdsNewStories[0]) {
            break;
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

    arrStateNewStories = true;
    await fetchInfo();

    store.set('arrState', arrOfNewsObj);

    return arrOfNewsObj;
}

export let arrOfNewsObj = [];

export async function fetchInfo() {
    arrOfNewsObj.length = 0;

    let endIdx = 50;

    if (loadedMore) {
        endIdx = 100;
    }

    for (let i = 0; i < endIdx; i++) {
        let url = "https://hacker-news.firebaseio.com/v0/item/" + arrOf100IdsOldStories[i] + ".json?print=pretty";
        await getResponseAndPushToArr(url);
    }
}

export async function loadMore() {
    let cashed100Ids = arrOf100IdsOldStories;

    for (let i = 50; i < 100; i++) {
        let url = "https://hacker-news.firebaseio.com/v0/item/" + cashed100Ids[i] + ".json?print=pretty";
        await getResponseAndPushToArr(url);
    }

    return arrOfNewsObj;
}

async function getResponseAndPushToArr(url) {
    let response = await fetch(url).catch(err => {
        console.log(err);
        getResponseAndPushToArr(url);
    });
    let json = await response.json();
    arrOfNewsObj.push(new PostCreation(json.id, json.title, json.score, json.by, json.time, json.url, json.text));

}

class PostCreation {
    constructor(id, title, rating, author, date, url, text) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.author = author;
        this.date = date;
        this.url = url;
        this.text = text;
    }
}



