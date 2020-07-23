const express = require('express');
const app = express();
const db = require('./database');

// Import models
const User = require('./models/User');
const Task = require('./models/Task');

// Middlware
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Set templating engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Static files
app.use(express.static('public'));

/**
 * Passport authentication
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'email'
  },
  (username, email, done) => {
    User.findOne({ where: { username: username, email: email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Username or Email was not found' });
        }
        return done(null, user);
      })
      .catch(err => done(err));
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ where: { id: id } })
    .then(user => cb(null, user))
    .catch(err => cb(err));
});


// Routes
app.use(require('./routes'));

/**
 * Models relationships
 */
// Task belongs to User, User may have multiple Tasks
User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User, { onDelete: 'CASCADE' });


db.sync()
  .then(res => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`\nServer running on http://localhost:${port}/\n\n`);
    });
  })
  .catch(err => console.log(err));