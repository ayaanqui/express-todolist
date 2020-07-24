const express = require('express');
const router = express.Router();

const passport = require('passport');

const authController = require('../controllers/auth');

router.post(
  '/signup',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false
  })
);

module.exports = router;