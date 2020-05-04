const utils = require('./utils');
const strategies = require('./strategies/jwt');

const pipe = (...functions) => (args) =>
  functions.reduce((arg, fn) => fn(arg), args);

function initializeAuthentication(app) {
  utils.setup();

  pipe(strategies.strategy)(app);
}

module.exports = { utils, initializeAuthentication, strategies };
