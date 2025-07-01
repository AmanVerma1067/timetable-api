const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Timetable = require('../models/timetable');
require('dotenv').config();

// POST /admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Auth middleware
function auth(req, res, next) {
  const token = req.body.token || req.query.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// POST /admin/update
router.post('/update', auth, async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  try {
    // Validate and use the provided data structure
    if (!Array.isArray(data) || data.length !== 1 || typeof data[0] !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid data format. Expected [{"0": {...}, "1": {...}}]' 
      });
    }
    
    // Count batches
    const batchCount = Object.keys(data[0]).length;
    
    // Update database in timetables collection
    await Timetable.findOneAndUpdate(
      {},
      { timetableData: data },
      { upsert: true, runValidators: true }
    );

    res.json({ 
      message: 'Timetable updated successfully',
      batchCount
    });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ 
      error: 'Error updating timetable',
      details: err.message 
    });
  }
});

module.exports = router;