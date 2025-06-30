const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
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
  const { token } = req.body;
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
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: '`data` must be an array of timetable objects' });
  }
  try {
    // Upsert each batch document
    for (const entry of data) {
      await Timetable.findOneAndUpdate(
        { batch: entry.batch },
        entry,
        { upsert: true, new: true }
      );
    }
    res.json({ message: 'Timetable updated successfully' });
  } catch (err) {
    console.error('Admin POST /update error:', err);
    res.status(500).json({ error: 'Error updating timetable' });
  }
});

// GET /admin/raw-timetable
router.get('/raw-timetable', auth, async (req, res) => {
  try {
    const all = await Timetable.find().select('-__v').lean();
    res.json(all);
  } catch (err) {
    console.error('Admin GET /raw-timetable error:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
