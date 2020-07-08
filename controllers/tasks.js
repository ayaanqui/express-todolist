const User = require('../models/User');
const Task = require('../models/Task');

exports.getTasks = (req, res, next) => {
  const localUser = req.cookies.user;

  if (localUser) {
    if (!localUser.username || !localUser.email)
      return res.redirect();

    User.findOne({
      where: { username: localUser.username, email: localUser.email }
    })
      .then(user => {
        Task.findAll({
          where: { userId: user.id },
          order: [['id', 'DESC']]
        })
          .then(tasks => res.status(200).send(tasks))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};

exports.getTask = (req, res, next) => { };

exports.postEditTask = (req, res, next) => {
  const localUser = req.cookies.user;

  if (localUser) {
    if (!localUser.username || !localUser.email)
      return res.redirect();

    User.findOne({
      where: { username: localUser.username, email: localUser.email }
    })
      .then(user => {
        const body = req.body;
        if (body.taskId) {
          Task.findAll({ where: { userId: user.id, id: body.taskId } })
            .then(tasks => res.status(200).send(tasks))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};

exports.postAddTask = (req, res, next) => {
  const body = req.body;
  const localUser = req.cookies.user;

  if (localUser || body || body.task) {
    User.findOne({
      where: { username: localUser.username, email: localUser.email }
    })
      .then(user => {
        Task.create({
          userId: user.id,
          task: body.task
        })
          .then(task => res.status(201).send(task))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  } else {
    res.status(401).send({ 'message': 'You must be authenticated in order to create a task' });
  }
};