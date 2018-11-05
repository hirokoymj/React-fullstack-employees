// const NotFoundPage = () =>{
//   return(
//     <h1>Page not found. Go to Homepage</h1>
//   )
// }
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
