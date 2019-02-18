const mongoose = require('mongoose');
const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
})

const Ideas = mongoose.model('ideas', ideaSchema);

module.exports = Ideas