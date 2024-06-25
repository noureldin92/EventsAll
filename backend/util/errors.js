// backend/util/errors.js

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;
