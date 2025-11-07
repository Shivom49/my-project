const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  type: { type: String, enum: ['view', 'cart', 'purchase'] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Interaction', interactionSchema);
