// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
