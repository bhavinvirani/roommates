const express = require('express');
const router = express.Router();
const authController = require('../api/controller/authController');


router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/refresh', authController.refresh);

router.get('/logout', authController.logout);


// router.post('/forgot-password', );

// router.post('/reset-password', );

module.exports = router;
