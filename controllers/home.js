const User = require('../models/User');
const Task = require('../models/Task');

exports.home = (req, res, next) => {
  const localUser = (req.cookies.user) ? req.cookies.user : null;
  const signupPage = 'pages/home/signup';

  if (localUser) {
    if (!localUser.username || !localUser.email)
      return res.render(signupPage);

    User.findOne({
      where: {
        username: localUser.username,
        email: localUser.email
      }
    })
      .then(user => {
        if (!user) {
          res.cookie('user', '', { expires: new Date(0) });
          return res.render(signupPage);
        }

        Task.findAll({
          where: { userId: user.id },
          order: [['id', 'DESC']]
        })
          .then(tasks => {
            res.render('pages/home/index', { user: user, tasks: tasks });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  } else {
    return res.render(signupPage);
  }
};