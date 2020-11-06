require('dotenv').config();
var mongoose = require('mongoose');

exports.connectToDb = async function () {
  var local_db = process.env.MONGODB_LOCAL;
  var mongoDB = process.env.MONGODB_CLOUD || local_db;
  await mongoose.connect(
    mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('successfully connected to database');
    },
  );
  var db = mongoose.connection;
  db.on(
    'error',
    console.error.bind(console, 'MongoDB connection error'),
  );
};
