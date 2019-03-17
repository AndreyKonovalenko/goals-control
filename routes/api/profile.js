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

// reote: GET api/profile
// desc: get user's goals List
// access: Privet

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    let goalsArr = [];
    console.log(req.user._id);
    Goal.find({ user: req.user._id }).then(list => {
      if (list) {
        goalsArr = [...list];
      }
    });
    console.log(goalsArr);
    // Profile.find({ user: req.user._id })
    //   .then(profile => {
    //     if (!profile) {
    //       Goal.find({ user: req.user._id }).then(list => {
    //         if (!list) {
    //           errors.noGoals = 'User does not have saved goals';
    //           res.status(404).json(errors);
    //         } else {
    //           list = list.map(element => ({
    //             id: element['_id'],
    //             title: element['title']
    //           }));
    //           const newProfile = new Profile({
    //             user: req.user._id,
    //             goals: list
    //           });
    //           console.log(newProfile);
    //           res.json(newProfile);
    //         }
    //       });
    //     } else {
    //     }
    //   })
    //   .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
