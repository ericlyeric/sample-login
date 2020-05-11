const User = require('../models/user');
const signToken = require('../auth/local').signToken;

exports.auth_register = function (req, res) {
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
};

exports.auth_login = function (req, res) {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: true,
    });
    res
      .status(200)
      .json({ isAuthenticated: true, user: { username, role } });
  }
};

exports.auth_logout = function (req, res) {
  res.clearCookie('access_token');
  res.json({ user: { username: '', role: '' }, success: true });
};
