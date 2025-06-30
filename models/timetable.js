const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  time:    { type: String, required: true },
  subject: { type: String, required: true },
  room:    { type: String, required: true },
  teacher: { type: String, required: true }
}, { _id: false });

const timetableSchema = new mongoose.Schema({
  batch:     { type: String, required: true, unique: true },
  Monday:    { type: [sessionSchema], default: [] },
  Tuesday:   { type: [sessionSchema], default: [] },
  Wednesday: { type: [sessionSchema], default: [] },
  Thursday:  { type: [sessionSchema], default: [] },
  Friday:    { type: [sessionSchema], default: [] },
  Saturday:  { type: [sessionSchema], default: [] }
});

module.exports = mongoose.model('Timetable', timetableSchema);
