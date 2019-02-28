const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const colors = require('colors');

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const goal = require('./routes/api/goal');

// using express as a router provider
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // Enable CORS for develompent

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE'); // I allowed only needed methods
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected !'))
  .catch(err => console.log(err));

//Passport middleware

app.use(passport.initialize());

// Passport Config

require('./config/passport')(passport);

// Use Routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/goal', goal);

// Server static assets if in production

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Settings for correct development on local machine and on ide.c9, remember that webpack web server runs on port 3000

let port = process.env.PORT || 5000;
if (port === '8080') {
  port = 8081;
}

app.listen(port, () => {
  const msg = 'Server running on address: '.cyan.bold;
  console.log(process.env.C9_HOSTNAME);
  const hostname = process.env.C9_HOSTNAME ?
    `${process.env.C9_HOSTNAME}:${port}`.underline :
    `http://localhost:${port}`.underline;
  console.log(`${msg}${hostname}`);
});
