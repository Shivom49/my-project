// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 1 minute cache

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl + JSON.stringify(req.body);
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    console.log('⚡ Serving from cache:', key);
    return res.json(cachedResponse);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };

  next();
};

module.exports = cacheMiddleware;
