const express = require('express');
const router = express.Router();
const { environment } = require('../config/constants');

const defaultRoutes = [
  {
    path: '/auth',
    route: require('./auth.routes'),
  },
  {
    path: '/user',
    route: require('./user.routes'),
  },
  {
    path: '/avatar',
    route: require('./avatar.routes'),
  },
  {
    path: '/request',
    route: require('./request.routes'),
  },
  {
    path: '/roommate',
    route: require('./roommate.routes'),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (
  process.env.NODE_ENV === environment.DEVELOPMENT ||
  process.env.NODE_ENV === environment.TEST
) {
  router.use('/test-server', (req, res, next) => {
    res.status(200).json({
      message: 'Server is Alive :)',
    });
  });
}

module.exports = router;
