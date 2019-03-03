import axios from 'axios';

let server_url;

//Development Mode

if (process.env.NODE_ENV === 'development') {
  // this is for C9 IDE development
  // we setup manually second port parameter for running server using REACT_APP_URL which is c9 environment variable
  // porcess.env.REACT_APP_URL contains app server url and set in package.json file only for divelopment in C9 IDE
  if (process.env.REACT_APP_URL) {
    server_url = process.env.REACT_APP_URL;
  } else {
    //  this is for local development
    server_url = 'http://localhost:5000';
  }
}

// Production
// host on Heroku

if (process.env.NODE_ENV === 'production') {
  server_url = 'https://goals.herokuapp.com/';
}

const instance = axios.create({
  baseURL: server_url
});

export default instance;
