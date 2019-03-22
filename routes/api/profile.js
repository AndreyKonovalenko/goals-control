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

// Load User Model
const Goal = require('../../models/Goal');

// route: GET api/profile/test
// desc: Tests profile route
// access: Public

router.get('/test', (req, res) =>
  res.json({ msg: 'Profiel route works fine' })
);

// route: GET api/profile
// desc: get user's goals List
// access: Privet

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    // Test profile for existance
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile.goals.length === 0) {
          errors.no_goals = 'User does not have saved goals';
          res.status(404).json(errors);
        }
        else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// route: POST api/profile/:id
// desc: update user goals list
// access: Privet

router.post('/:id',
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const newGaolsArray = {};
    newGaolsArray.goals = req.body;
    console.log(newGaolsArray)
    // Update
    Profile.findByIdAndUpdate(req.params.id, { $set: newGaolsArray }, { new: true })
      .then(profile => res.json(profile));
  }
);

module.exports = router;
