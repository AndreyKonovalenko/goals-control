import axios from 'axios';

let url;

//Development Mode

if (process.env.NODE_ENV === 'development') {
  // this is for C9 IDE development
  // process.env.REACT_APP_URL is a varialbe  which is set in the package.json file
  if (process.env.REACT_APP_URL) {
    url = process.env.REACT_APP_URL;
  } else {
    //  this is for local development
    url = 'http://localhost:5000';
  }
}

// Production
// host on Heroku

if (process.env.NODE_ENV === 'production') {
  url = 'https://goals.herokuapp.com/';
}

const instance = axios.create({
  baseURL: url
});

export default instance;
