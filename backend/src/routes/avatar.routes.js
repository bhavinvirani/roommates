const express = require('express');
const avatarController = require('../api/controller/avatarController');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('avatar'), avatarController.uploadAvatar);

module.exports = router;
