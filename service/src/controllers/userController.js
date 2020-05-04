const User = require('../models/user');

async function getUserById(id) {
  return await User.findById(id).exec();
}

async function createUser({
  firstName,
  lastName,
  email,
  password,
  providerId,
  provider,
}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async function (resolve, reject) {
    const user = await User.findOne({ email });

    if (user) {
      return reject('Email is already in use');
    }

    return resolve(
      await User.create({
        providerId,
        provider,
        firstName,
        lastName,
        email,
        password,
      }),
    );
  });
}

async function getUserByEmail(email) {
  return await (await User.findOne({ email })).execPopulate();
}

module.exports = { getUserById, createUser, getUserByEmail };
