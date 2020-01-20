const mongoose = require("mongoose");

const Rooms = new mongoose.Schema({
  building: String,
  rooms: Array
});

module.exports = mongoose.model("Room", Rooms);
