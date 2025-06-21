const express = require('express');
const router = express.Router();
const Vibe = require('../models/Vibe');

// @route   GET api/v1/vibes
// @desc    Get all vibes with populated user data
router.get('/', async (req, res) => {
  try {
    const vibes = await Vibe.find()
      .populate('user', 'username _id') // Only include username and _id from User
      .sort({ date: -1 }); // Newest first
    
    // Transform the data to match your desired format
    const transformedVibes = vibes.map(vibe => ({
      _id: vibe._id,
      mood: vibe.mood,
      message: vibe.message,
      date: vibe.date,
      user: {
        _id: vibe.user._id,
        username: vibe.user.username
      }
    }));

    res.json(transformedVibes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;