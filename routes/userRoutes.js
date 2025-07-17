const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users, sorted by totalPoints descending
// GET all users with rank
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    // Add rank field manually
    const rankedUsers = users.map((user, index) => ({
      _id: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1
    }));

    res.json(rankedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
