const db = require('../../database');
const User = require('../../models/User');

exports.auth = (req, res, next) => {
  const body = req.body;

  if (!body.username || !body.email)
    res.redirect('/');

  db.query(`SELECT * FROM users WHERE username=$1 AND email=$2`, [body.username, body.email])
    .then(({ rows }) => {
      if (rows.length > 0) {
        res.cookie('user', rows[0]).redirect('/');
      } else {
        User.insert(body.username, body.email)
          .then(result => {
            User.findByUsername(body.username)
              .then(({ rows }) => res.cookie('user', rows[0]).redirect('/'))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};