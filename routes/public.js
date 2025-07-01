const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');

// GET /api/timetable
router.get('/timetable', async (req, res) => {
  try {
    // Get the single document from timetables collection
    const doc = await Timetable.findOne()
      .select('timetableData -_id')
      .lean();
    
    // Return the timetableData array or empty array if no data
    res.json(doc ? doc.timetableData : []);
  } catch (err) {
    console.error('Timetable fetch error:', err);
    res.status(500).json({ error: 'Server error while fetching timetable' });
  }
});

module.exports = router;