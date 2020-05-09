require('dotenv').config();
// const path = require('path');
const express = require('express');
// const createError = require('http-errors');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
// const passport = require('passport');

const connection = require('./models/connection');

const port = process.env.PORT || 3001;

// routes go here
var indexRouter = require('./routes/index');
var helloRouter = require('./routes/hello');
var userRouter = require('./routes/user');

const app = express();

// db stuff goes here
// Set up mongoose connection
connection.connectToDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app.use(passport.initialize());
// app.use(passport.session());

// add routes here
app.use('/', indexRouter);
app.use('/test', helloRouter);
app.use('/user', userRouter);

app.listen(port, function () {
  console.log(
    `Server started, listening at http://localhost:${port}`,
  );
});

module.exports = app;
