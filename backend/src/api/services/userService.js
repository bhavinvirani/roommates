const { Op } = require('sequelize');
const { User, Preference } = require('../models');

const createUser = async (user) => {
  const transaction = await User.sequelize.transaction();
  try {
    const newUser = await User.create(user, { transaction });
    await Preference.create({ username: newUser.username }, { transaction });
    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const createPref = async (userId) => {
  return Preference.create({
    userID: userId,
  });
};

const getAllUsers = async () => {
  return User.findAll({
    include: {
      model: Preference,
      as: 'preference',
    },
  });
};

const getUserByEmail = async (email) => {
  return User.findOne({
    where: { email },
    include: {
      model: Preference,
      as: 'preference',
    },
  });
};

const getUserByUsername = async (username) => {
  return User.findOne({
    where: { username },
    include: {
      model: Preference,
      as: 'preference',
    },
  });
};

const getByEmailOrUsername = async (emailOrUsername, requiredFields) => {
  const queryOptions = {
    where: {
      [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  };
  if (requiredFields) {
    queryOptions.attributes = ['id', 'email', ...requiredFields];
  }
  return User.findOne(queryOptions);
};

const getByEmailAndUsername = async (email, username) => {
  return User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });
};

const getPrefByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const getUserByRT = async (refreshToken) => {
  return User.findOne({
    where: { refreshToken },
    field: ['id', 'email', 'username'],
  });
};

// Update User
const updateUser = async (username, details) => {
  return User.update(
    { ...details },
    {
      where: { username },
    }
  );
};

const updatePref = async (username, preference) => {
  const updateObj = {
    house: preference.house,
    apartment: preference.apartment,
    condo: preference.condo,
    nightPerson: preference.nightPerson,
    morningPerson: preference.morningPerson,
    extrovert: preference.extrovert,
    introvert: preference.introvert,
    smoker: preference.smoker,
    bringFriendsOver: preference.bringFriendsOver,
    loud: preference.loud,
    shareFood: preference.shareFood,
    messy: preference.messy,
    pets: preference.pets,
    relationship: preference.relationship,
  };
  return Preference.update(
    {
      house: preference.house,
      apartment: preference.apartment,
      condo: preference.condo,
      nightPerson: preference.nightPerson,
      morningPerson: preference.morningPerson,
      extrovert: preference.extrovert,
      introvert: preference.introvert,
      smoker: preference.smoker,
      bringFriendsOver: preference.bringFriendsOver,
      loud: preference.loud,
      shareFood: preference.shareFood,
      messy: preference.messy,
      pets: preference.pets,
      relationship: preference.relationship,
    },
    {
      where: { username },
    }
  );
};

const updateRefreshToken = async (email, refreshToken) => {
  return User.update(
    {
      refreshToken,
    },
    {
      where: { email },
    }
  );
};

// Delete User
const deleteUser = async (email) => {
  return User.destroy({
    where: {
      email,
    },
  });
};

const deletePref = async (email) => {
  return User.update(
    {
      desired_roommates: null,
    },
    {
      where: { email },
    }
  );
};

module.exports = {
  createUser,
  createPref,
  getUserByEmail,
  getAllUsers,
  getByEmailOrUsername,
  getByEmailAndUsername,
  getUserByUsername,
  getUserByRT,
  updateUser,
  updateRefreshToken,
  updatePref,
  getPrefByEmail,
  deletePref,
  deleteUser,
};
