const express = require('express');
const router = express.Router();
const passport = require('passport');

const user_controller = require('../controllers/userController');

router.get(
  '/is-admin',
  passport.authenticate('jwt', { session: false }),
  user_controller.user_isadmin,
);

router.get(
  '/is-authenticated',
  passport.authenticate('jwt', { session: false }),
  user_controller.user_isauthenticated,
);

module.exports = router;
