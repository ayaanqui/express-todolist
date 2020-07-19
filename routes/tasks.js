const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getTasks);
router.post('/add-task', tasksController.postAddTask);
router.get('/:taskId', tasksController.getTask);
router.delete('/:taskId', tasksController.deleteTask);

module.exports = router;