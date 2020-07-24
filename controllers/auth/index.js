const User = require('../../models/User');

exports.register = (req, res, next) => {
  const body = req.body;

  if (!body.username || !body.email)
    res.status().send({ message: 'Username or email field missing' });

  User.findOrCreate({
    where: { username: body.username, email: body.email }
  })
    .then(([user, created]) => {
      if (created === true)
        return res.status(201).send({ user: user });
      else
        return res.status(422).send({ message: 'User with the Username/Email already exists' });
    })
    .catch(err => console.log(err));
};