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

/**
 * Models relationships
 */
const User = require('./models/User');
const Task = require('./models/Task');
// Task belongs to User, User may have multiple Tasks
User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User, { onDelete: 'CASCADE' });

db.sync({ force: true })
  .then(res => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`\nServer running on http://localhost:${port}/\n\n`);
    });
  })
  .catch(err => console.log(err));