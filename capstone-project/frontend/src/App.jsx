// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendationShowcase from "./components/RecommendationShowcase";
import "./App.css";
import "./index.css"; // ✅ ensure this line exists

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/recommendations", { userId: 1 })
      .then((res) => setItems(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return <RecommendationShowcase items={items} />;
}

export default App;
