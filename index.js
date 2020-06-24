const express = require('express');
const app = express();
const db = require('./database');

// Middlware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set templating engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Static files
app.use(express.static('public'));

// Routes
app.use(require('./routes'));

db.sync()
  .then(res => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`\nServer running on http://localhost:${port}/\n\n`);
    });
  })
  .catch(err => console.log(err));