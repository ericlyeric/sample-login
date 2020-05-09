const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../auth/local');
const User = require('../models/user');
const Todo = require('../models/todo');

router.post('/register', function (req, res) {
  const { username, password, role } = req.body;
  User.findOne({ username }, function (err, user) {
    if (err) {
      res.status(500).json({
        message: { msgBody: 'Error has occured', msgError: true },
      });
    }
    if (user) {
      res.status(400).json({
        message: {
          msgBody: 'Username is already taken',
          msgError: true,
        },
      });
    } else {
      const newUser = new User({ username, password, role });
      newUser.save(function (err) {
        if (err) {
          res.status(500).json({
            message: { msgBody: 'Error has occured', msgError: true },
          });
        } else {
          res.status(201).json({
            message: {
              msgBody: 'Account successfully created',
              msgError: false,
            },
          });
        }
      });
    }
  });
});

module.exports = router;
