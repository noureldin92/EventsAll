// backend/util/errors.js

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAuthError';
    this.status = 401;
  }
}

exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;
