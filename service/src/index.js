require('dotenv').config();
// const path = require('path');
const express = require('express');
// const createError = require('http-errors');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const connection = require('./models/connection');

const port = process.env.PORT || 3001;

// routes go here
var indexRouter = require('./routes/index');
var helloRouter = require('./routes/hello');

const app = express();

// db stuff goes here
// Set up mongoose connection
connection.connectToDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// add routes here
app.use('/', indexRouter);
app.use('/test', helloRouter);

// testing create a new user
const User = require('./models/user');

const userInput = {
  username: 'tesuser1',
  password: '1234567',
  role: 'admin',
};

const user = new User(userInput);
user.save(function (err, document) {
  if (err) {
    console.log(err);
  }
  console.log(document);
});

app.listen(port, function () {
  console.log(
    `Server started, listening at http://localhost:${port}`,
  );
});

module.exports = app;
