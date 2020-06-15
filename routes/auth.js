const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.auth);

module.exports = router;