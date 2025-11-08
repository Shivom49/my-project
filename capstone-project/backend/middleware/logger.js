// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const { v4: uuidv4 } = require('uuid');

const logger = (req, res, next) => {
  req.traceId = uuidv4();
  console.log(`🪵 [${req.traceId}] ${req.method} ${req.originalUrl}`);
  res.setHeader('X-Trace-ID', req.traceId);
  next();
};

module.exports = logger;
