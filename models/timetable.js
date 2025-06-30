const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  batch: { type: String, required: true, unique: true },
  Monday: { type: [String], default: [] },
  Tuesday: { type: [String], default: [] },
  Wednesday: { type: [String], default: [] },
  Thursday: { type: [String], default: [] },
  Friday: { type: [String], default: [] },
  Saturday: { type: [String], default: [] }
});

module.exports = mongoose.model('Timetable', timetableSchema, 'timetables');
