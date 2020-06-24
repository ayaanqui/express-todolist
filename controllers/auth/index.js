const User = require('../../models/User');

exports.auth = (req, res, next) => {
  const body = req.body;

  if (!body.username || !body.email)
    res.redirect('/');

  User
    .findOrCreate({
      where: {
        username: body.username,
        email: body.email,
      }
    })
    .then(([user, created]) => {
      res.cookie('user', user).redirect('/');
    })
    .catch(err => res.status(400).send({ message: 'Username or Email is already in use' }));
};