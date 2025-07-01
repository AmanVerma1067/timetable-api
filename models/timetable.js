const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  time:    { type: String, required: true },
  subject: { type: String, required: true },
  room:    { type: String, required: true },
  teacher: { type: String, required: true }
}, { _id: false });

const timetableSchema = new mongoose.Schema({
  timetableData: {
    type: [{
      type: Map,
      of: new mongoose.Schema({
        batch: { type: String, required: true },
        Monday: [sessionSchema],
        Tuesday: [sessionSchema],
        Wednesday: [sessionSchema],
        Thursday: [sessionSchema],
        Friday: [sessionSchema],
        Saturday: [sessionSchema]
      })
    }],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length === 1 && 
               arr[0] instanceof Map &&
               Array.from(arr[0].keys()).every(k => !isNaN(k));
      },
      message: 'Timetable must be single-element array with numeric keys'
    }
  }
}, { 
  timestamps: true,
  collection: 'timetables' // Explicit collection name
});

module.exports = mongoose.model('Timetable', timetableSchema);