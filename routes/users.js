const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Vibe= require("../models/Vibe");

// @route   POST api/v1/users/:userId/follow
// @desc    Follow a user
router.post('/:userId/follow', auth, async (req, res) => {
  try {
    // Check if user is trying to follow themselves
    if (req.params.userId === req.user.id) {
      return res.status(400).json({ msg: 'You cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if already following
    if (currentUser.following.includes(req.params.userId)) {
      return res.status(400).json({ msg: 'Already following this user' });
    }

    // Add to following list
    currentUser.following.push(req.params.userId);
    await currentUser.save();

    // Add to followers list
    userToFollow.followers.push(req.user.id);
    await userToFollow.save();

    res.json({ msg: 'User followed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/v1/feed
// @desc    Get personalized feed
router.get('/feed', auth, async (req, res) => {
  try {
    // Get user with following list
    console.log("Inside feed");
    const user = await User.findById(req.user.id).select('following');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const vibes = await Vibe.find({ 
      user: { $in: user.following } 
    })
    .populate('user', 'username _id')
    .sort({ date: -1 });

    res.json(vibes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;