// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

import React, { useEffect, useState } from "react";
import API from "../api";
import RecommendationCarousel from "../components/RecommendationCarousel";
import { toast } from "react-toastify";

function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = 1; // Dummy user (later from login/session)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await API.post("/recommendations", { userId });
        if (res.data.fallback) {
          toast.info("Showing popular items (cold start)");
        }
        setRecommendations(res.data.data?.similar_users || res.data.data || []);
      } catch (error) {
        toast.error("Failed to load recommendations");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎯 Personalized Recommendations</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <RecommendationCarousel items={recommendations} />
      )}
    </div>
  );
}

export default Home;
