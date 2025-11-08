// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  preferences: [String],
});

module.exports = mongoose.model('User', userSchema);
