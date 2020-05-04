const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

function setup() {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
}

function signToken(user) {
  return jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: 604800, // 7 days
  });
}

async function hashPassword(password) {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function verifyPassword(candidate, actual) {
  return await bcrypt.compare(candidate, actual);
}

module.exports = { setup, signToken, hashPassword, verifyPassword };
