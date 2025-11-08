// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

import React, { useEffect, useState } from "react";
import RecommendationCarousel from "./RecommendationCarousel";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer"; // ✅ Added Footer import

const RecommendationShowcase = ({ items }) => {
  const [greeting, setGreeting] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("🌅 Good Morning, Shivom Parashari");
    else if (hour < 18) setGreeting("🌞 Good Afternoon, Shivom Parashari");
    else setGreeting("🌙 Good Evening, Shivom Parashari");
  }, []);

  const playVoiceGreeting = () => {
    // 🔇 Voice disabled intentionally
    console.log("🎧 Voice greeting skipped for silent mode");
  };

  const handleStart = () => {
    playVoiceGreeting();
    setStarted(true);
  };

  if (!items || items.length === 0) {
    return <p style={{ color: "#fff", textAlign: "center" }}>No recommendations available.</p>;
  }

  return (
    <div
      style={{
        padding: "3rem 2rem",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Welcome Screen */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "radial-gradient(circle at center, #141e30 0%, #243b55 100%)",
              zIndex: 10,
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                fontSize: "2.5rem",
                marginBottom: "2rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #00f0ff, #ff00c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(0,255,255,0.8)",
              }}
            >
              Welcome to Your Recommendation System
            </motion.h1>

            <motion.button
              onClick={handleStart}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px #00f0ff",
              }}
              style={{
                fontSize: "1.5rem",
                padding: "1rem 2rem",
                borderRadius: "50px",
                background: "linear-gradient(45deg, #00f0ff, #ff00c8)",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                textShadow: "0 0 8px rgba(255,255,255,0.7)",
              }}
            >
              ▶ Start Experience
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {started && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{ width: "100%" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              textAlign: "left",
              background: "linear-gradient(45deg, #00f0ff, #ff00c8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(0, 240, 255, 0.8)",
            }}
          >
            {greeting}
          </motion.h1>

          {/* Row 1 */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={headingStyle("#00f0ff", "#ff0099")}
          >
            ⚡ Recommended for You
          </motion.h2>
          <RecommendationCarousel items={items.slice(0, 10)} autoScroll={true} scrollSpeed={1.3} />

          {/* Row 2 */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={headingStyle("#00e5ff", "#ff00c8")}
          >
            🔥 Popular Now
          </motion.h2>
          <RecommendationCarousel items={items.slice(10, 20)} autoScroll={false} scrollSpeed={0} />

          {/* Row 3 */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={headingStyle("#00ffcc", "#ff00a0")}
          >
            💡 Tech Setup Essentials
          </motion.h2>
          <RecommendationCarousel items={items.slice(20, 30)} autoScroll={false} scrollSpeed={0} />

          {/* Footer Section */}
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

// 🎨 Heading Gradient Style
const headingStyle = (c1, c2) => ({
  textAlign: "left",
  fontSize: "1.8rem",
  fontWeight: "bold",
  margin: "2rem 0 1rem 2rem",
  background: `linear-gradient(45deg, ${c1}, ${c2})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export default RecommendationShowcase;
