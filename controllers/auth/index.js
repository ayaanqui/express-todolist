const db = require('../../database');
const User = require('../../models/User');

exports.auth = (req, res, next) => {
  const body = req.body;

  if (!body.username || !body.email)
    res.redirect('/');

  db.query('SELECT * FROM users WHERE username=$1 AND email=$2', [body.username, body.email])
    .then(({ rows }) => {
      if (rows.length > 0) {
        res.cookie('user', rows[0]).redirect('/');
      } else {
        User.findByUsername(body.username)
          .then(usernameOb => {
            User.findByEmail(body.email)
              .then(emailOb => {
                if (usernameOb.rows.length > 0 || emailOb.rows.length > 0) {
                  console.log('Either the username or email is in use by another user...');
                  res.redirect('/');
                } else {
                  // If username and email are not taken
                  // Then we can create a new user
                  User.insert(body.username, body.email)
                    .then(() => {
                      User.findByUsername(body.username)
                        .then(({ rows }) => res.cookie('user', rows[0]).redirect('/'))
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};