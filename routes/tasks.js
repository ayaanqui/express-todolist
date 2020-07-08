const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getTasks);
router.post('/add-task', tasksController.postAddTask);

module.exports = router;