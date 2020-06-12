const express = require('express');
const routesApp = express();

routesApp.use(require('./home.js'));

module.exports = routesApp;