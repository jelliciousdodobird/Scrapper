const mongoose = require("mongoose");

// const Slot = new mongoose.Schema({
//   major: String,
//   sectionNumber: String,
//   classNumber: String,
//   type: String,
//   day: String,
//   time: String,
//   room: String,
//   instructor: String
// });

const Slot = new mongoose.Schema({
  major: String,
  sectionNumber: String,
  classNumber: String,
  type: String,
  day: [{ type: String }],
  startTime: String,
  endTime: String,
  time: String,
  building: String,
  room: String,
  instructor: String
});

module.exports = mongoose.model("Slot", Slot);
