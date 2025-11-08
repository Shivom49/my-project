// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  category: String,
  popularity: Number,
});

module.exports = mongoose.model('Item', itemSchema);
