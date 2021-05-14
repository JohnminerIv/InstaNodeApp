require('../data/db');

const User = require('../models/user');

User.remove({}, function (err) {
    console.log('User collection removed')
});