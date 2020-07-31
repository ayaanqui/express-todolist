const User = require('../models/User');
const Task = require('../models/Task');

exports.home = (req, res, next) => {
  const user = req.user;
  const signupPage = 'pages/login';

  if (user) {
    Task.findAll({
      where: { userId: user.id },
      order: [['id', 'DESC']]
    })
      .then(tasks => {
        res.render('pages/home/index', { user: user, tasks: tasks });
      })
      .catch(err => console.log(err));
  } else {
    return res.render(signupPage);
  }
};