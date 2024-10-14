const jwt = require('jsonwebtoken');
const constants = require('../config/constants');

const signJwt = (payload, options) => {
  return jwt.sign(payload, constants.jwtConfig.secret, options);
};

const verifyJwt = (token) => {
  try {
    return jwt.verify(token, constants.jwtConfig.secret);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signJwt,
  verifyJwt,
};
