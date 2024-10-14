const express = require('express');
const router = express.Router();
const roommateController = require('../api/controller/roommateController');
const { verifyToken } = require('../middlewares/auth');



router.get('/:username', verifyToken, roommateController.getRoommatesByUsername); 

router.post('/', verifyToken, roommateController.addRoommate);






module.exports = router;
