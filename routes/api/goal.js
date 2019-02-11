const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Optional. Use this if you create a lot of connections and don't want
// to copy/paste `{ useNewUrlParser: true }`.

mongoose.set('useFindAndModifify', false);

// Load Goal Model
const Goal = require('../../models/Goal');

// Load User Model
const User = require('../../models/User');

// route: GET api/user/test
// desc: Tests goal route
// access Public

router.get('/test', (req, res) => res.json({ msg: 'Goal route works fine' }));

module.exports = router;
