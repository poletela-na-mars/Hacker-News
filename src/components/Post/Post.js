// import React from 'react';
// import {Link} from 'react-router-dom';
//
// import './Post.css';
// import {fixDate} from './fixDate';
//
// let Post = ({id, title, rating, author, date, url}) => {
//     return (
//         <div className="post">
//             <Link to='/news-page' state={{ newsPageProps: id }} style={{textDecoration: 'none', color: 'inherit'}}>
//                 <div className="post__title"><h3>{title}</h3></div>
//             </Link>
//             <div className="post__info">
//                 <div className="rating"><span className="blue__words">Rating:</span>&ensp;{rating}</div>
//                 <div className="author"><span className="blue__words">Author:</span>&ensp;{author}</div>
//                 <div className="date"><span className="blue__words">Date:</span>&ensp;{fixDate(date)}</div>
//             </div>
//         </div>
//     );
// };
//
// export default Post;
