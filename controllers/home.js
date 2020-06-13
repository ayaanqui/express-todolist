const User = require('../models/User');

exports.home = (req, res, next) => {
  const user = (req.cookies.user) ? req.cookies.user : null;
  const loggedIn = (user) ? true : false;
  return res.render('pages/home/index', { loggedIn: loggedIn, user: user });
};

exports.signup = (req, res, next) => {
  const body = req.body;
  User.findByUsername(body.username)
    .then(({ rows }) => {
      if (rows.length > 0 && body.username === rows[0].username) {
        User.findByEmail(body.email)
          .then(({ rows }) => {
            if (rows.length > 0 && body.email === rows[0].email) {
              res.cookie('user', rows[0]).redirect('/');
            } else {
              console.log('Incorrect email');
              res.redirect('/');
            }
          })
          .catch(err => console.log(err));
      } else {
        console.log('Incorrect email');
        res.redirect('/');
      }
    })
    .catch(err => console.log(err));
};