const User = require('../../models/User');
const Task = require('../../models/Task');

module.exports = (req, res, next) => {
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