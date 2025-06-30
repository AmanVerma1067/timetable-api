const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');

// GET /api/timetable - public route
router.get('/timetable', async (req, res) => {
  try {
    const data = await Timetable.find(); // Fetch all batches
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching timetable' });
  }
});

module.exports = router;