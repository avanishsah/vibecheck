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
    ref: 'User', 
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vibe', VibeSchema);