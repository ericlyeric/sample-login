const express = require('express');
const router = express.Router();
const passport = require('passport');

const auth_controller = require('../controllers/authController');

router.post('/register', auth_controller.auth_register);

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  auth_controller.auth_login,
);

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  auth_controller.auth_logout,
);

module.exports = router;
