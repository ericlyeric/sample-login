const Todo = require('../models/todo');
const User = require('../models/user');

exports.todo_create = function (req, res) {
  const todo = new Todo(req.body);
  todo.save(function (err) {
    if (err) {
      res.status(500).json({
        message: { msgBody: 'Error has occured', msgError: true },
      });
    } else {
      req.user.todos.push(todo);
      req.user.save(function (err) {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: 'Error has occured',
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            message: {
              msgBody: 'Successfully created todo',
              msgError: false,
            },
          });
        }
      });
    }
  });
};

exports.todo_get_all = function (req, res) {
  User.findById({ _id: req.user._id })
    .populate('todos')
    .exec(function (err, document) {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: 'Error has occured',
            msgError: true,
          },
        });
      } else {
        res
          .status(200)
          .json({ todos: document.todos, isAuthenticated: true });
      }
    });
};
