const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Optional. Use this if you create a lot of connections and don't want
// to copy/paste `{ useNewUrlParser: true }`.

mongoose.set('useFindAndModifify', false);

// Load Input validaition
const validateGoalInput = require('../../validation/goalbuilder');

// Load Goal Model
const Goal = require('../../models/Goal');

// Load User Model
const User = require('../../models/User');

// route: GET api/goal/test
// desc: Tests goal route
// access Public

router.get('/test', (req, res) => res.json({ msg: 'Goal route works fine' }));

// router POST api/goal
// desc   Create goal
// access Privete

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateGoalInput(req.body);

    // // Check validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    // const newGoal = new Goal({
    //   user: req.user.id,
    //   title: req.body.title,
    //   limitation: req.body.limitation,
    //   from: req.body.from
    // });
    console.log(req.user);
    return res.json({ msg: req.user.id });
    //newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
