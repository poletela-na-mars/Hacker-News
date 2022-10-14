// const getDate = (time) => {
//     const date = time * 1000;
//     const formattedDate = `${new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()}.${new Date(date).getMonth() < 9 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}, ${new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : new Date(date).getHours()}:${new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()}`;
//
//     return formattedDate;
// };

const fixDate = (date) => {
    let dateObj = new Date(date * 1000);
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let year = dateObj.getFullYear();

    let month = months_arr[dateObj.getMonth()];

    let day = dateObj.getDate();

    let hours = dateObj.getHours();

    let minutes = "0" + dateObj.getMinutes();

    //MM-dd-yyyy, h:m
    return day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes.slice(-2);
}

// const createMarkup = (data) => {
//     return {__html: data};
// };

export {
    fixDate,
    // createMarkup
};