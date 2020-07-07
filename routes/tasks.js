const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.post('/add-task', tasksController.postAddTask);
router.get('/', tasksController.fetchAll);

module.exports = router;