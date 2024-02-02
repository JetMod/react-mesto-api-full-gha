// eslint-disable-next-line import/no-unresolved
require('dotenv').config();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const express = require('express');
const mongoose = require('mongoose');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const {
  URL_REGULAR_EXP,
  INTERNAL_SERVER_ERROR_CODE,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
} = require('./constants/constants');

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// utils
app.use(express.json());
app.use(helmet()); // USE HELMET
app.use(limiter); // USE LIMITER

// cors
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

// request logger
app.use(requestLogger);

// server crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// authorization
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGULAR_EXP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// protected routes with middlewares auth
app.use(userRouter);
app.use(cardRouter);

// wrong path
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_CODE
        ? 'Произошла неизвестная ошибка на сервере'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Сервер открыт на порту: ${PORT}`);
});
