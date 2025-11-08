// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  itemId: { type: Number, required: true },
  type: { type: String, enum: ['view', 'cart', 'purchase'], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Interaction', interactionSchema);
