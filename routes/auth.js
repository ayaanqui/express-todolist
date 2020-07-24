const express = require('express');
const router = express.Router();

const passport = require('passport');

const authController = require('../controllers/auth');

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false
  })
);
router.post('/register', authController.register);

module.exports = router;