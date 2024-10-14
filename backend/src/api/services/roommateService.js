const { User, House, Roommate } = require('../models');
const sequelize = require('sequelize');

const addRoommate = async (person1username, person2username) => {
  const user1 = await User.findByPk(person1username, {
    include: {
      model: House,
      as: 'houses',
    },
  });
  const user2 = await User.findByPk(person2username, {
    include: {
      model: House,
      as: 'houses',
    },
  });

  if (user1.houses.length > 0 && user2.houses.length > 0) {
    return {
      success: false,
      message: 'Unable, both users already have a house',
    };
  }

  let house;
  if (user1.houses.length > 0) {
    house = user1.houses[0];
    const userCount = await house.countUsers();
    if (userCount >= 10) {
      return {
        success: false,
        message: 'Unable, house is full',
      };
    }
    await house.addUser(user2);
    return 'Added to house';
  }

  if (user2.houses.length > 0) {
    house = user2.houses[0];
    const userCount = await house.countUsers();
    if (userCount >= 10) {
      return {
        success: false,
        message: 'Unable, house is full',
      };
    }
    await house.addUser(user1);
    return 'Added to house';
  }

  house = await House.create();
  await house.addUsers([user1, user2]);
  return 'Created house';
};

const getAllRoommates = async (username) => {
  const userWithRoommates = await User.findOne({
    where: { username },
    attributes: ['username', 'name'],
    include: [
      {
        model: House,
        as: 'houses',
        attributes: ['id'],
        through: {
          attributes: [],
        },
        include: [
          {
            model: User,
            as: 'users',
            where: {
              username: { [sequelize.Op.ne]: username },
            },
            attributes: [
              'username',
              'name',
              'photoID',
              'bio',
              'gender',
              'age',
              'city',
            ],
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });

  const users = userWithRoommates.houses.flatMap((house) => house.users);
  return {
    username: userWithRoommates.username,
    name: userWithRoommates.name,
    roommates: users,
  };
};

module.exports = {
  getAllRoommates,
  addRoommate,
};
