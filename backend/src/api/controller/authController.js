const CustomErrors = require('../../errors');
const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { statusCode } = require('../../config/constants');
const userService = require('../services/userService');
const constants = require('../../config/constants');
const { omit } = require('lodash');
const { verifyPassword } = require('../../utils/encryption');
const { signJwt, verifyJwt } = require('../../utils/jwt');

const omitUserFields = (user) => {
  const fields = ['password', 'refreshToken', 'createdAt', 'updatedAt'];
  return omit(user.toJSON(), fields);
};

const signup = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const isExist = await userService.getByEmailAndUsername(email, username);
  if (isExist) {
    return successResponse(
      res,
      statusCode.SUCCESS,
      null,
      'User already exists, Try with other Email or Username',
      false
    );
  }
  const user = await userService.createUser({
    username,
    email,
    password,
  });
  const userData = omitUserFields(user);
  return successResponse(res, statusCode.CREATED, userData, 'User created', true);
});

const login = asyncWrapper(async (req, res) => {
  const { emailOrUsername, password } = req.body;
  const user = await userService.getByEmailOrUsername(emailOrUsername, ['password']);
  if (!user) {
    return successResponse(
      res,
      statusCode.SUCCESS,
      null,
      'User not found, Please signup',
      false
    );
  }
  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    return successResponse(res, statusCode.SUCCESS, null, 'Invalid credentials', false);
  }
  const userData = await userService.getUserByEmail(user.email);

  const accessToken = signJwt(
    { email: userData.email, username: userData.username },
    { expiresIn: constants.jwtConfig.accessTokenExpiry }
  );
  const refreshToken = signJwt(
    { email: userData.email, username: userData.username },
    { expiresIn: constants.jwtConfig.refreshTokenExpiry }
  );

  await userService.updateRefreshToken(userData.email, refreshToken);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 2000,
  });

  return successResponse(
    res,
    statusCode.SUCCESS,
    { token: accessToken },
    'User loggedIn successfully',
    true
  );
});

const refresh = asyncWrapper(async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw CustomErrors.BadRequestError('No token found');
  }

  const user = await userService.getUserByRT(token);
  if (!user) {
    throw CustomErrors.ForbiddenError('User not found');
  }
  const payload = verifyJwt(token);
  if (!payload) {
    throw CustomErrors.ForbiddenError('Invalid token');
  }

  const accessToken = signJwt(
    { email: user.email, username: user.username },
    { expiresIn: constants.jwtConfig.accessTokenExpiry }
  );

  return successResponse(
    res,
    statusCode.SUCCESS,
    { accessToken, username: user.username },
    'Token refreshed',
    true
  );
});

const logout = asyncWrapper(async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw CustomErrors.NoContentError('No token found');
  }
  const user = await userService.getUserByRT(token);
  if (!user) {
    throw CustomErrors.ForbiddenError('User not found');
  }
  await userService.updateRefreshToken(user.email, null);

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  return successResponse(res, statusCode.SUCCESS, null, 'User logged out', true);
});


module.exports = {
  signup,
  login,
  logout,
  refresh,
};
