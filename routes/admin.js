const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Timetable = require('../models/Timetable');

// POST /admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// GET /admin/raw-timetable
router.get('/raw-timetable', authMiddleware, async (req, res) => {
  const data = await Timetable.find();
  res.json(data);
});

// POST /admin/update
router.post('/update', authMiddleware, async (req, res) => {
  const updates = req.body.data;
  try {
    for (const entry of updates) {
      await Timetable.findOneAndUpdate(
        { batch: entry.batch },
        entry,
        { upsert: true, new: true }
      );
    }
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
