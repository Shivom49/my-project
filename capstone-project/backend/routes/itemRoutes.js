// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const express = require('express');
const Item = require('../models/item');
const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

module.exports = router;
