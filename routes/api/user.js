const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route GET api/user/test
// @desc Tests user route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'User route works' }));

module.exports = router;
