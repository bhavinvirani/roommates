const express = require('express');
const router = express.Router();
const requestController = require('../api/controller/requestController');
const { verifyToken } = require('../middlewares/auth');


router.get('/', verifyToken,requestController.getAllRequests);

router.post('/', verifyToken, requestController.createRequest);

router.delete('/', verifyToken,requestController.deleteRequest);

module.exports = router;
