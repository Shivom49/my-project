const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,   // Simple text (can use bcrypt later)
  balance: Number
});

module.exports = mongoose.model("User", userSchema);
