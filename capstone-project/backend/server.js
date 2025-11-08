// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const client = require('prom-client'); // 🧩 Prometheus metrics
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const logger = require('./utils/logger');

const app = express();

// ------------------------------------------------------------
// 🧩 Global Middlewares
// ------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ✅ Winston logger for each request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// ------------------------------------------------------------
// 🧩 Prometheus Metrics Setup
// ------------------------------------------------------------
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    logger.error(`❌ Metrics endpoint error: ${err.message}`);
    res.status(500).send('Error collecting metrics');
  }
});

// ------------------------------------------------------------
// 🩺 Health Check Endpoint
// ------------------------------------------------------------
app.get('/health', (req, res) => {
  res.json({ status: 'Backend OK' });
});

// ------------------------------------------------------------
// 🧠 API Routes
// ------------------------------------------------------------
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/interactions', interactionRoutes);

// ⚙️ Recommendation route without auth
app.use('/api/recommendations', recommendationRoutes);

// ------------------------------------------------------------
// 🏠 Root endpoint
// ------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ------------------------------------------------------------
// 🗄️ Database Connection
// ------------------------------------------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('✅ MongoDB connected');
    app.listen(5000, () => logger.info('🚀 Server running on port 5000'));
  })
  .catch(err => logger.error(`❌ Database connection failed: ${err.message}`));
