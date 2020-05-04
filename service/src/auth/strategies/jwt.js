const passport = require('passport');
const passportJWT = require('passport-jwt');

const userController = require('../../controllers/userController');
const signToken = require('../utils');

const JWTStrategy = passportJWT.Strategy;

function strategy() {
  const strategyOptions = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
  };

  const verifyCallback = async function (req, jwtPayload, cb) {
    try {
      const user = await userController.getUserById(
        jwtPayload.data._id,
      );
      req.user = user;
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };

  passport.use(new JWTStrategy(strategyOptions, verifyCallback));
}

function login(req, user) {
  return new Promise(function (resolve, reject) {
    req.login(user, { session: false }, function (err) {
      if (err) {
        return reject(err);
      }
    });
    return resolve(signToken(user));
  });
}

module.exports = { strategy, login };
