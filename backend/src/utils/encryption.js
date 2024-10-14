const bcrypt = require('bcrypt');
const constant = require('../config/constants');

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, constant.jwtConfig.saltRounds);
};

const verifyPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

module.exports = {
  encryptPassword,
  verifyPassword,
};
