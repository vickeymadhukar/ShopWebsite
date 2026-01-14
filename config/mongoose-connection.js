const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("developemnt:mongoose");
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
