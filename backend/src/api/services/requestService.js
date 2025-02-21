const { is } = require('date-fns/locale');
const { Request, User } = require('../models');

const getAllRequests = async () => {
  return await Request.findAll();
};

const getRequestsByFromAndTo = async (to, from) => {
  return await Request.findAll({
    where: {
      to,
      from,
    },
    include: [
      {
        model: User,
        as: 'fromUser', // Assuming the alias used for the 'from' relationship
        attributes: [
          'username',
          'name',
          'email',
          'gender',
          'photoID',
          'bio',
          'city',
        ], // Add specific attributes you want to include
      },
      {
        model: User,
        as: 'toUser', // Assuming the alias used for the 'to' relationship
        attributes: [
          'username',
          'name',
          'email',
          'gender',
          'photoID',
          'bio',
          'city',
        ], // Add specific attributes you want to include
      },
    ],
  });
};

const getRequestsByRecipient = async (to) => {
  const requests = await Request.findAll({
    where: {
      to,
    },
    include: [
      {
        model: User,
        as: 'fromUser',
        attributes: [
          'username',
          'name',
          'email',
          'gender',
          'photoID',
          'bio',
          'city',
          'age'
        ],
      },
    ],
  });

  const mergedRequests = requests.map((request) => ({
    ...request.get(),
    ...(request.fromUser ? request.fromUser.get() : {}),
  }));

  return mergedRequests;
};

const getRequestsBySender = async (from) => {
  const requests = await Request.findAll({
    where: {
      from,
    },
    include: [
      {
        model: User,
        as: 'toUser',
        attributes: [
          'username',
          'name',
          'email',
          'gender',
          'photoID',
          'bio',
          'city',
          'age'
        ],
      },
    ],
  });

  const mergedRequests = requests.map((request) => ({
    ...request.get(),
    ...(request.toUser ? request.toUser.get() : {}),
  }));
  return mergedRequests;
};

const createRequest = async (from, to, message) => {
  return await Request.create({
    from,
    to,
    text: message,
  });
};

const deleteRequest = async (from, to) => {
  return await Request.destroy({
    where: {
      from,
      to,
    },
  });
};

module.exports = {
  getRequestsByFromAndTo,
  getRequestsByRecipient,
  getRequestsBySender,
  createRequest,
  getAllRequests,
  deleteRequest,
};
