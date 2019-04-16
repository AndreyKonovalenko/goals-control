const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const daysArrayBuilder = require('../../utils/daysArrayBuilder');

// Optional. Use this if you create a lot of connections and don't want
// to copy/paste `{ useNewUrlParser: true }`.

mongoose.set('useFindAndModify', false);

// Load Input validaition
const validateGoalInput = require('../../validation/goal');

// Load Goal Model
const Goal = require('../../models/Goal');

// Load User Model
const User = require('../../models/User');

// Load Profile Model
const Profile = require('../../models/Profile');

// route: GET api/goal/test
// desc: Tests goal route
// access Public

router.get('/test', (req, res) => res.json({ msg: 'Goal route works fine' }));

// router POST api/goal
// desc   Create goal
// access Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGoalInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // const daysArray =
    const days = daysArrayBuilder(req.body.from, req.body.limitation);

    const newGoal = new Goal({
      user: req.user.id,
      title: req.body.title,
      from: req.body.from,
      limitation: req.body.limitation,
      days: days
    });
    newGoal.save().then(goal => {
      // Profile update with new goal id and title;
      Profile.findOne({ user: req.user.id }).then(profile => {
        const newGoal = {
          id: goal._id,
          title: req.body.title
        };
        profile.goals.unshift(newGoal);
        profile.save();
      });
      res.json(goal);
    });
  }
);

// route: GET api/goal/:id
// desc: Fetch selected goal by id
// access Private

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Goal.findById(req.params.id)
      .then(goal => {
        res.json(goal);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @router DELETE api/goal/:id
// @desc   DELETE goal by id
// @access Privete

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Goal.findById(req.params.id)
      .then(goal => {
        // Check for post owner
        if (goal.user.toString() !== req.user.id) {
          // 401 is unauthorised http request status
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        // Delete
        goal.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ goalnotfound: 'No post found' }));
  }
);

module.exports = router;
