const express = require('express');
const routesApp = express();

routesApp.use(require('./home'));
routesApp.use(require('./auth'));
routesApp.use('/tasks', require('./tasks'));

routesApp.get('/logout', (req, res, next) => {
  return res.cookie('user', '', { expires: new Date(0) }).redirect('/');
});

module.exports = routesApp;