const mongoose = require('mongoose');

const Title = mongoose.model('Title', new mongoose.Schema({
  name: String,
}));

exports.Title = Title; 