// index.html

// Require Libraries
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Middleware
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Require the database
require('./data/db');
// Auth checking middleware
const checkAuth = require('./utils/checkAuth');

// App Setup
const app = express();
const publicPath = path.join(__dirname, 'public');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(checkAuth);

// Routes
app.use('/', express.static(publicPath));

app.get('/', (req, res) => {
    const currentUser = req.user;
    res.render('index', { currentUser });
})

require('./controllers/auth.js')(app);

// Start Server
if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Listening at http://localhost:${process.env.PORT}`)
    });
}

module.exports = { app }