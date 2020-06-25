const express = require('express');
const routesApp = express();

routesApp.use(require('./home'));
routesApp.use(require('./auth'));
routesApp.use('/tasks', require('./tasks'));

module.exports = routesApp;