const jwt = require('jsonwebtoken');
const IncorrectError = require('../errors/incorrectError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new IncorrectError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new IncorrectError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
