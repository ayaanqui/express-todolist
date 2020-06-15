const express = require('express');
const routesApp = express();

routesApp.use(require('./home.js'));
routesApp.use(require('./auth.js'));

module.exports = routesApp;