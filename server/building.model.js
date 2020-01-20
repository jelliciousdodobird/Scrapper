const mongoose = require("mongoose");

const Building = new mongoose.Schema({
  //   building: String
  building: String,
  rooms: Array
});

module.exports = mongoose.model("Building", Building);
