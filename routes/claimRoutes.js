const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// GET /api/claim/history — all claims, newest first (PUT THIS FIRST!)
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ timestamp: -1 })
      .populate('userId', 'name'); // to get user's name

    const formatted = history.map(entry => ({
      user: entry.userId ? entry.userId.name : 'Deleted User',
      points: entry.pointsClaimed,
      time: entry.timestamp
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/claim/:userId — Award random points (1–10)
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Update user totalPoints
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: randomPoints } },
      { new: true }
    );

    // Create claim history
    const history = new ClaimHistory({
      userId,
      pointsClaimed: randomPoints
    });
    await history.save();

    res.json({
      message: 'Points claimed!',
      points: randomPoints,
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
