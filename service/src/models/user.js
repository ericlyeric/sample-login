const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

UserSchema.pre('save', function (next) {
  let self = this;
  if (!self.isModified('password')) {
    return next();
  }
  bcrypt.hash(self.password, 10, function (err, passwordHash) {
    if (err) {
      return next(err);
    }
    self.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  let self = this;
  bcrypt.compare(password, self.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, self);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
