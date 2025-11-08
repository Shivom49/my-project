// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 🔹 Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'User registered', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
