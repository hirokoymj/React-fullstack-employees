const mongoose = require('mongoose');

const Department = mongoose.model('Department', new mongoose.Schema({
  name: String,
}));

exports.Department = Department; 