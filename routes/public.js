const express   = require('express');
const router    = express.Router();
const Timetable = require('../models/timetable');

// GET /api/timetable
// Returns exactly the JSON array of batches/sessions.
router.get('/timetable', async (req, res) => {
  try {
    const data = await Timetable
      .find({})
      .select('-_id -__v')     // remove Mongo internals
      .lean();                  // return plain JS objects
    res.json(data);
  } catch (err) {
    console.error('Public GET /timetable error:', err);
    res.status(500).json({ error: 'Server error while fetching timetable' });
  }
});

module.exports = router;
