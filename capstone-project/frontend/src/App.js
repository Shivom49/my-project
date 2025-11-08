// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

import React, { useEffect, useState } from "react";
import axios from "axios";
import RecommendationShowcase from "./components/RecommendationShowcase";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Adjust your backend route if needed
        const res = await axios.post("http://localhost:5000/api/recommendations", {
          userId: 1,
        });

        if (res.data && res.data.data) {
          setItems(res.data.data); // ✅ Make sure all 30 items come here
          console.log("Fetched items:", res.data.data.length, res.data.data);
        } else {
          console.log("⚠️ No data in response:", res.data);
        }
      } catch (error) {
        console.error("❌ Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <RecommendationShowcase items={items} />
    </div>
  );
}

export default App;
