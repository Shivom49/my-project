const express = require('express');
const Interaction = require('../models/interaction');
const router = express.Router();

router.get('/', async (req, res) => {
  const interactions = await Interaction.find().populate('userId itemId');
  res.json(interactions);
});

router.post('/', async (req, res) => {
  const interaction = new Interaction(req.body);
  await interaction.save();
  res.json(interaction);
});

module.exports = router;
