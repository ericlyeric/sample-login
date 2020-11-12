require('dotenv').config({ path: './src/config/.env' });
const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const logger = require('morgan');

const connection = require('./config/connection');

const port = process.env.PORT || 3001;

// routes go here
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var todoRouter = require('./routes/todos');

const app = express();

// set up mongoose connection
connection.connectToDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// add routes here
app.use('/', indexRouter);
app.use(`${process.env.BASE_API_URL}/auth`, authRouter);
app.use(`${process.env.BASE_API_URL}/user`, userRouter);
app.use(`${process.env.BASE_API_URL}/todo`, todoRouter);

app.listen(port, function () {
  console.log(
    `Server started, listening at http://localhost:${port}`,
  );
});

module.exports = app;
