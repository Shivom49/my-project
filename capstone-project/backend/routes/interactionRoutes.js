// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const express = require('express');
const axios = require('axios');
const Interaction = require('../models/interaction');
const Item = require('../models/item');
const cache = require('../middleware/cacheMiddleware'); // ✅ keep cache
const router = express.Router();

// ------------------------------------------------------------
// Get Recommendations (no auth for now)
// ------------------------------------------------------------
router.post('/', cache, async (req, res) => {
  try {
    const { userId } = req.body;

    // Step 1️⃣: Check if user has any interaction history
    const history = await Interaction.find({ userId });

    if (history.length === 0) {
      console.log('⚠️ Cold start user detected');
      const popularItems = await Item.find().sort({ popularity: -1 }).limit(5);
      return res.json({
        message: 'Cold-start fallback: showing popular items',
        fallback: true,
        data: popularItems,
      });
    }

    // Step 2️⃣: Fetch real recommendations from Flask (port updated to 6060)
    const flaskResponse = await axios.post('http://127.0.0.1:6060/recommend', {
      user_id: userId,
    });

    return res.json({
      message: 'Recommendations fetched successfully',
      fallback: false,
      data: flaskResponse.data,
    });
  } catch (error) {
    console.error('❌ Error fetching recommendations:', error.message);
    res.status(500).json({ error: 'Recommendation system failed' });
  }
});

module.exports = router;
