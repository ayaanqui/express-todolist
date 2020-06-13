const express = require('express');
const app = express();
const db = require('./database');

// Middlware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Set templating engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Static files
app.use(express.static('public'));

// Routes
app.use(require('./routes'));

// Models
const User = require('./models/User');

const port = 3000;
app.listen(port, () => {
  User.createTable()
    .catch(err => console.log(err));

  console.log(`\nServer running on http://localhost:${port}/\n\n`);
});