import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import axios from 'axios';

// const promise = axios.get('http://localhost:3001/notes');
// console.log(promise);
// // response value
// promise.then(response => {
//   console.log(response);
// })
// // data value
// promise.then(response => {
//   const notes = response.data;
//   console.log(notes);
// })
// // chained format
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data;
//     console.log(notes);
//   })



ReactDOM.render(
    <App />,
  document.getElementById('root')
);

