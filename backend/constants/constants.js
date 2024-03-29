const CREATED_CODE = 201;
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;

const URL_REGULAR_EXP = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

const ALLOWED_CORS = [
  'http://prost.nomoredomainsmonster.ru',
  'https://prost.nomoredomainsmonster.ru',
  'http://api.prost.nomoredomainsmonster.ru',
  'https://api.prost.nomoredomainsmonster.ru',
  'http://51.250.18.25',
  'https://51.250.18.25',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  URL_REGULAR_EXP,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
