const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Vibe = require('../models/Vibe');
const Comment = require('../models/Comment');

router.post(
  '/:vibeId/comments',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const vibe = await Vibe.findById(req.params.vibeId);
      if (!vibe) {
        return res.status(404).json({ msg: 'Vibe not found' });
      }

      const comment = new Comment({
        text: req.body.text,
        user: req.user.id,
        vibe: req.params.vibeId
      });

      await comment.save();
      
      // Populate user info
      await comment.populate('user', 'username _id');

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/v1/vibes/:vibeId/comments
// @desc    Get all comments for a vibe
router.get('/:vibeId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ vibe: req.params.vibeId })
      .populate('user', 'username _id')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;