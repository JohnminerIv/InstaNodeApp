/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = `mongodb://${process.env.ROOTUSER}:${process.env.ROOTPASS}@${process.env.DB}:27017/${process.env.DATABASENAME}?authSource=admin`;
mongoose.Promise = global.Promise;

mongoose.connect(
    url,
    {
        useUnifiedTopology: true, useNewUrlParser: true
    },
    function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to database");
    }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));

mongoose.set("debug", true);
module.exports = mongoose.connection;
