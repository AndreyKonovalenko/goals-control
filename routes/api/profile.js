const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Optional. Use this if you create a lot of connections and don't want
// to copy/paste `{ useNewUrlParser: true }`.

mongoose.set('useFindAndModifify', false);

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

// route: GET api/profile/test
// desc: Tests profile route
// access Public

router.get('/test', (req, res) =>
  res.json({ msg: 'Profiel route works fine' })
);

module.exports = router;
