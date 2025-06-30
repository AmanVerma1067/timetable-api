const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Dummy login endpoint for local testing
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// POST /admin/update - update or insert timetable
router.post('/update', async (req, res) => {
  const { token, data } = req.body;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    for (const entry of data) {
      await Timetable.findOneAndUpdate(
        { batch: entry.batch },
        entry,
        { upsert: true, new: true }
      );
    }
    res.json({ message: 'Timetable updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating timetable' });
  }
});

// GET raw data (for admin view in frontend)
router.get('/raw-timetable', async (req, res) => {
  try {
    const all = await Timetable.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
