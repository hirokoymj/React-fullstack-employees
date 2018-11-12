const mongoose = require('mongoose');

const Counter = mongoose.model('Counter', new mongoose.Schema({
  "_id": { "type": String, "required": true },
  "seq": { "type": Number, "default": 0 }
}));


exports.Counter = Counter; 