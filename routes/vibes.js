const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Vibe = require('../models/Vibe');
const { protect } = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalVibes = await Vibe.countDocuments();

    const vibes = await Vibe.find()
      .populate('user', 'username _id')
      .sort({ date: -1 }) 
      .skip(skip)
      .limit(limit);

    const pagination = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: totalVibes,
      totalPages: Math.ceil(totalVibes / limit)
    };

    if (page < pagination.totalPages) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (page > 1) {
      pagination.previous = {
        page: page - 1,
        limit
      };
    }

    res.json({
      success: true,
      count: vibes.length,
      pagination,
      data: vibes
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error' 
    });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      });
    }

    const vibe = await Vibe.findById(req.params.id)
      .populate('user', 'username');

    if (!vibe) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Vibe not found with the specified ID'
      });
    }

    res.json({
      success: true,
      data: vibe
    });
  } catch (err) {
    next(err); 
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('mood', 'Mood is required').not().isEmpty(),
      check('message', 'Message is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newVibe = new Vibe({
        mood: req.body.mood,
        message: req.body.message,
        user: req.user.id
      });

      const vibe = await newVibe.save();
      await vibe.populate('user', 'username _id');

      res.status(201).json(vibe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id/like', auth, async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    if (!vibe) {
      return res.status(404).json({ msg: 'Vibe not found' });
    }

    if (vibe.likes.includes(req.user.id)) {
      const index = vibe.likes.indexOf(req.user.id);
      vibe.likes.splice(index, 1);
      await vibe.save();
      return res.json({ msg: 'Vibe unliked successfully' });
    }

    vibe.likes.push(req.user.id);
    await vibe.save();
    res.json({ msg: 'Vibe liked successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    
    if (!vibe) {
      return res.status(404).json({ msg: 'Vibe not found' });
    }

    if (vibe.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        msg: 'Not authorized to delete this vibe' 
      });
    }

    await vibe.deleteOne();
    res.status(200).json({ 
      success: true,
      msg: 'Vibe deleted successfully' 
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
