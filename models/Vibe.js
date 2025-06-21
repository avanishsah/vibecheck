const mongoose = require('mongoose');

const VibeSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This references the User model
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vibe', VibeSchema);