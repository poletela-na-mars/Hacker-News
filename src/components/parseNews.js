import { loadedMore } from './NewsFeed/NewsFeed';
export let arrStateNewStories = false; //false - empty

let arrOf100IdsNewStories = new Array(100);
let arrOf100IdsOldStories = new Array(100);

export async function parseNews() {
    arrOf100IdsNewStories.length = 0;
    arrStateNewStories = false;
    let response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
        .catch(err => {
            console.log(err)
        });
    // .then(results => results.json())
    // .then(data => {
    //     for (let i = 0; i < 100; i++) {
    //         arrOf100IdsNewStories.push(data[i]);
    //     }
    //     alert('1 alert  ' + arrOf100IdsNewStories.length);
    // })
    // .catch(err => console.log(err));
    let json = await response.json();
    for (let i = 0; i < 100; i++) {
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

    arrStateNewStories = true;
    await fetchInfo();
    return arrOfNewsObj;
}

let arrOfNewsObj = [];

export async function fetchInfo() {
    arrOfNewsObj.length = 0;

    //let startIdx;
    let endIdx = 50;

    // switch (count) {
    //     case 0:
    //         startIdx = 0;
    //         endIdx = 20;
    //         break;
    //     case 1:
    //         startIdx = 20;
    //         endIdx = 40;
    //         break;
    //     case 2:
    //         startIdx = 40;
    //         endIdx = 60;
    //         break;
    //     case 3:
    //         startIdx = 60;
    //         endIdx = 80;
    //         break;
    //     case 4:
    //         startIdx = 80;
    //         endIdx = 100;
    //         break;
    //     default:
    //         return;
    // }

    if (loadedMore) {
        endIdx = 100;
        // if (updatedManually) {
        //     endIdx = 50;
        //     loadedMore = false;
        // }
    }


    // for (startIdx; startIdx < endIdx; startIdx++) {
    for (let i = 0; i < endIdx; i++) {
        let url = "https://hacker-news.firebaseio.com/v0/item/" + arrOf100IdsOldStories[i] + ".json?print=pretty";
        // let response = await fetch(url).catch(err => {
        //     console.log(err)
        // });
        // let json = await response.json();
        // arrOfNewsObj.push(new PostCreation(json.id, json.title, json.score, json.by, json.time));
        await getResponseAndPushToArr(url);
    }

    // count++;
    // if (count === 5) {
    //     count = 0;
    //     arrOfNewsObj.length = 0;
    //     //УБРАТЬ КНОПКУ
    // }
}

// export let loadedMore = false;
// let updatedManually = false;

export async function loadMore() {
    let cashed100Ids = arrOf100IdsOldStories;
    // updatedManually = updM;

    for (let i = 50; i < 100; i++) {
        let url = "https://hacker-news.firebaseio.com/v0/item/" + cashed100Ids[i] + ".json?print=pretty";
        // let response = await fetch(url).catch(err => {
        //     console.log(err)
        // });
        // let json = await response.json();
        // arrOfNewsObj.push(new PostCreation(json.id, json.title, json.score, json.by, json.time));
        await getResponseAndPushToArr(url);
    }

    // loadedMore = true;
    return arrOfNewsObj;
}

async function getResponseAndPushToArr(url) {
    let response = await fetch(url).catch(err => {
        console.log(err)
    });
    let json = await response.json();
    arrOfNewsObj.push(new PostCreation(json.id, json.title, json.score, json.by, json.time, json.url));
}


class PostCreation {
    constructor(id, title, rating, author, date, url) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.author = author;
        this.date = date;
        this.url = url;
    }
}



