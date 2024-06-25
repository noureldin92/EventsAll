// backend/util/auth.js;

const { NotAuthError } = require('./errors');

function isValidPassword(password, storedPassword) {
  return password === storedPassword;
}

exports.isValidPassword = isValidPassword;
