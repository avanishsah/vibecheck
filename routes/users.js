const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Vibe= require("../models/Vibe");

router.post('/:userId/follow', auth, async (req, res) => {
  try {
    if (req.params.userId === req.user.id) {
      return res.status(400).json({ msg: 'You cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (currentUser.following.includes(req.params.userId)) {
      return res.status(400).json({ msg: 'Already following this user' });
    }

    currentUser.following.push(req.params.userId);
    await currentUser.save();

    userToFollow.followers.push(req.user.id);
    await userToFollow.save();

    res.json({ msg: 'User followed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/feed', auth, async (req, res) => {
  try {
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