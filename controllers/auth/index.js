const User = require('../../models/User');

exports.auth = (req, res, next) => {
  const body = req.body;
  const errors = [];

  User.findByUsername(body.username)
    .then(({ rows }) => {
      if (rows.length > 0 && body.username === rows[0].username) {
        User.findByEmail(body.email)
          .then(({ rows }) => {
            if (rows.length > 0 && body.email === rows[0].email) {
              res.cookie('user', rows[0]).redirect('/');
            } else {
              errors.push({
                'email': 'Email is already in use by another user, please try a different one.'
              });
              res.redirect('/');
            }
          })
          .catch(err => console.log(err));
      } else {
        errors.push({
          'username': 'Username is unavailable. Try using a different one'
        });
        res.redirect('/');
      }
    })
    .catch(err => console.log(err));
};