const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// Load Profile Model
const Profile = require('../../models/Profile');

// route: GET api/user/test
// desc: Tests user route
// access: Public

router.get('/test', (req, res) => res.json({ msg: 'User route works' }));

// route: POST api/user/register
// desc: Register new user
// access Public

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() // .save() is mongoose method
            .then(user => {
              // Creating empty profile for new user
              new Profile({
                user: user._id,
                goals: []
              }).save();
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// route: POST api/user/login
// desc: Login user// Returning JWT Token
// access: Public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  // for this we gonna use mongoose User module

  // User.findOne({email: email}) it is equal User.findOne({email})
  User.findOne({ email }).then(user => {
    // Check for user

    if (!user) {
      errors.email = 'User no found';
      return res.status(400).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        const payload = {
          id: user.id
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
