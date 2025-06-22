 
const express = require('express');
const Vibe = require('../models/Vibe');
const protect = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('following');
    console.log(user);
    const followingIds = user.following.map(u => u._id);
    const vibes = await Vibe.find({ user: { $in: followingIds } }).populate('user', 'username');
    res.status(200).json({ success: true, vibes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;