const express = require('express');
const router = express.Router();

router.post('/add-task', require('../controllers/tasks/addTask'));

module.exports = router;