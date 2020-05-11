const express = require('express');
const router = express.Router();
const passport = require('passport');

const todo_controller = require('../controllers/todoController');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  todo_controller.todo_create,
);

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  todo_controller.todo_get_all,
);

module.exports = router;
