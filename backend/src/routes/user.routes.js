const express = require('express');
const router = express.Router();
const userController = require('../api/controller/userController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, userController.getUsers);

router.get('/:username', verifyToken, userController.getUserByUsername);

router.put('/', verifyToken, userController.updateUser);

router.put('/preferences', verifyToken, userController.updatePref);

module.exports = router;
