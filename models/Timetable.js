const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  batch: { type: String, required: true, unique: true },
  Monday: [String],
  Tuesday: [String],
  Wednesday: [String],
  Thursday: [String],
  Friday: [String],
  Saturday: [String],
});

module.exports = mongoose.model('Timetable', timetableSchema);
