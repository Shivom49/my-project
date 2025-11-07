const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  category: String,
  popularity: Number,
});

module.exports = mongoose.model('Item', itemSchema);
