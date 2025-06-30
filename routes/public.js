const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

router.get('/timetable', async (req, res) => {
  if (req.headers['x-api-key'] !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const data = await Timetable.find();
  res.json(data);
});

module.exports = router;
