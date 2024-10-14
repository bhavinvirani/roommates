const logger = require('../config/logger');
const { verifyJwt } = require('../utils/jwt');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({
      status: false,
      message: 'No token provided',
      data: null,
      success: false,
    });
  }
  const accessToken = authHeader.split(' ')[1];
  try {
    const user = verifyJwt(accessToken);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({
        status: false,
        message: 'Token expired, please log in again',
        data: null,
        success: false,
      });
    } else {
      return res.status(401).send({
        status: false,
        message: 'Unauthorized',
        data: null,
        success: false,
      });
    }
  }
};

module.exports = {
  verifyToken,
};
