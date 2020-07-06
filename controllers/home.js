const User = require('../models/User');

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
        return res.render('pages/home/index', { user: user });
      })
      .catch(err => console.log(err));
  } else {
    return res.render(signupPage);
  }
};