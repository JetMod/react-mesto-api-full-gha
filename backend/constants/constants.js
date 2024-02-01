const OK = 200;
const SUCCESS = 201;
const NOT_FOUND_ERROR = 404;
const SERVER_BAD_REQUEST_CODE = 500;
const BAD_REQUEST_CODE = 400;
const CONFLICT_ERROR_CODE = 409;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR = 403;

const urlValidator = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

const ALLOWED_CORS = [
  'http://prost.nomoredomains.monster',
  'https://prost.nomoredomains.monster',
  'http://api.prost.nomoredomains.monster',
  'https://api.prost.nomoredomains.monster',
  'http://84.252.143.154',
  'https://84.252.143.154',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  SUCCESS,
  OK,
  NOT_FOUND_ERROR,
  SERVER_BAD_REQUEST_CODE,
  urlValidator,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR_CODE,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
