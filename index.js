const express = require('express');
const app = express();

/**
 * Middleware
 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Set templating engine
app.set('view engine', 'pug');

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res, next) => {
    res.render('index');
});

const port = 3000;
app.listen(port, () => {
    console.log(`\nServer running on port ${port} at http://localhost:${port}/\n\n`);
});