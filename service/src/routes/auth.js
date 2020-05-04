var express = require('express');
var router = express.Router();
var utils = require('../auth/utils');
var jwt = require('../auth/strategies/jwt');
var userController = require('../controllers/userController');

router.post('/login', async function (req, res) {
  const { email, password } = req.body;

  const user = await userController.getUserByEmail(email);

  function authenticationError() {
    return res
      .status(500)
      .json({ success: false, data: 'Authentication error!' });
  }

  if (!(await utils.verifyPassword(password, user.password))) {
    console.error('Passowrds do not match');
    return authenticationError();
  }

  let token = null;
  try {
    token = await jwt.login(req, user);
    return res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
      })
      .json({ success: true, data: '/' });
  } catch (err) {
    console.error('Log in error', err);
    return authenticationError();
  }
});

router.post('/register', async function (req, res) {
  const { firstName, lastName, email, password } = req.body;
  if (!/\b\w+@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res
      .status(500)
      .json({ success: false, data: 'Enter a valid email address.' });
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).json({
      success: false,
      data: 'Password must be between 5 and 20 characters.',
    });
  }

  let user = null;
  try {
    user = await userController.createUser({
      firstName,
      lastName,
      email,
      password: await utils.hashPassword(password),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, data: 'Email is already taken' });
  }

  let token = null;
  try {
    token = await jwt.login(req, user);
    return res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
      })
      .json({
        success: true,
        data: '/',
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, data: 'Authentication error!' });
  }
});

module.exports = router;
