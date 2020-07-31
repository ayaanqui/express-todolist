const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/', homeController.home);
router.get('/signup', (req, res) => res.render('pages/signup'));

module.exports = router;