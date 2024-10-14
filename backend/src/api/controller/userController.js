const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { statusCode } = require('../../config/constants');
const userService = require('../services/userService');
const avatarService = require('../services/avatarService');

const getUsers = asyncWrapper(async (req, res) => {
  let users;
  if (req.query.username) {
    users = await userService.getUserByUsername(req.query.username);
  } else if (req.query.email) {
    users = await userService.getUserByEmail(req.query.email);
  } else {
    users = await userService.getAllUsers();
  }
  const responseData = users.map((user) => ({
    username: user.username,
    email: user.email,
    photoID: user.photoID,
    name: user.name,
    age: user.age,
    city: user.city,
    bio: user.bio,
    gender: user.gender,
    hasResidence: user.hasResidence,
    apartment: user.preference.apartment,
    house: user.preference.house,
    condo: user.preference.condo,
    nightPerson: user.preference.nightPerson,
    morningPerson: user.preference.morningPerson,
    extrovert: user.preference.extrovert,
    introvert: user.preference.introvert,
    smoker: user.preference.smoker,
    bringFriendsOver: user.preference.bringFriendsOver,
    loud: user.preference.loud,
    shareFood: user.preference.shareFood,
    messy: user.preference.messy,
    pets: user.preference.pet,
    relationship: user.preference.relationship,
  }));
  
  const usersWithAvatar = await avatarService.addSignedUrl(responseData);
  return successResponse(res, statusCode.SUCCESS, usersWithAvatar, '', true);
});

const getUserByUsername = asyncWrapper(async (req, res) => {
  const { username } = req.params;
  const user = await userService.getUserByUsername(username);
  const userData = {
    username: user.username,
    email: user.email,
    photoID: user.photoID,
    name: user.name,
    age: user.age,
    city: user.city,
    bio: user.bio,
    gender: user.gender,
    hasResidence: user.hasResidence,
    apartment: user.preference.apartment,
    house: user.preference.house,
    condo: user.preference.condo,
    nightPerson: user.preference.nightPerson,
    morningPerson: user.preference.morningPerson,
    extrovert: user.preference.extrovert,
    introvert: user.preference.introvert,
    smoker: user.preference.smoker,
    bringFriendsOver: user.preference.bringFriendsOver,
    loud: user.preference.loud,
    shareFood: user.preference.shareFood,
    messy: user.preference.messy,
    pets: user.preference.pet,
    relationship: user.preference.relationship,
  };
  const usersWithAvatar = await avatarService.addSignedUrl([userData]);
  return successResponse(res, statusCode.SUCCESS, usersWithAvatar[0], 'User found', true);
});

const updateUser = asyncWrapper(async (req, res) => {
  const { username } = req.user;
  const {
    email,
    photoID,
    name,
    age,
    city,
    bio,
    gender,
    desiredRoommates,
    hasResidence,
  } = req.body;
  const updatedUser = await userService.updateUser(username, {
    email,
    photoID,
    name,
    age,
    city,
    bio,
    gender,
    desiredRoommates,
    hasResidence,
  });
  return successResponse(res, statusCode.SUCCESS, updatedUser, 'User updated', true);
});

const updatePref = asyncWrapper(async (req, res) => {
  const { username } = req.body;
  const {
    apartment,
    house,
    condo,
    nightPerson,
    morningPerson,
    extrovert,
    introvert,
    smoker,
    bringFriendsOver,
    loud,
    shareFood,
    messy,
    pets,
    relationship,
  } = req.body;
  const updatedUser = await userService.updatePref(username, {
    apartment,
    house,
    condo,
    nightPerson,
    morningPerson,
    extrovert,
    introvert,
    smoker,
    bringFriendsOver,
    loud,
    shareFood,
    messy,
    pets,
    relationship,
  });
  return successResponse(res, statusCode.SUCCESS, updatedUser, 'User updated', true);
});

module.exports = {
  getUsers,
  getUserByUsername,
  updateUser,
  updatePref,
};
