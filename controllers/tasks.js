const User = require('../models/User');
const Task = require('../models/Task');

exports.getTasks = (req, res, next) => {
  if (req.user) {
    Task.findAll({
      where: { userId: req.user.id },
      order: [['id', 'DESC']]
    })
      .then(tasks => res.status(200).send(tasks))
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};

exports.getTask = (req, res, next) => {
  const user = req.user;

  if (user) {
    const taskId = req.params.taskId;

    Task.findOne({
      where: { userId: user.id, id: taskId }
    })
      .then(task => {
        if (!task)
          next();

        const completed = req.query.completed;
        if (completed) {
          Task.update(
            { completed: completed },
            { where: { userId: user.id, id: task.id } }
          )
            .then(updatedTask => res.status(200).send({ id: task.id, completed: completed }))
            .catch(err => console.log(err));
        } else {
          res.status(200).send(task);
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};

exports.deleteTask = (req, res, next) => {
  if (req.user) {
    const taskId = req.params.taskId;
    Task.destroy({
      where: { userId: req.user.id, id: taskId }
    })
      .then(status => {
        if (status === 1)
          return res.status(200).send({ "message": "Task deleted!" });
        else
          return res.status(400).send({ "message": "Looks like there was an error when trying to delete the task" });
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};

exports.postEditTask = (req, res, next) => {
  if (req.user) {
    const body = req.body;
    const taskId = req.params.taskId;
    if (taskId) {
      Task.update(
        { task: body.task },
        { where: { userId: req.user.id, id: taskId } }
      )
        .then(updatedTask => {
          return res.status(200).send(updatedTask);
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};

exports.postAddTask = (req, res, next) => {
  if (req.user || req.body || req.body.task) {
    Task.create({
      userId: req.user.id,
      task: req.body.task
    })
      .then(task => res.status(201).send(task))
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};