const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}

// authorization, protecting resources
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'Saitama',
    },
    function (payload, done) {
      User.findById({ _id: payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    },
  ),
);

// authentication local, username / password logging in
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      // something wrong with db
      if (err) {
        return done(err);
      }
      // if no user exists
      if (!user) {
        return done(null, false);
      }
      // check if password is correct
      user.comparePassword(password, done);
    });
  }),
);
