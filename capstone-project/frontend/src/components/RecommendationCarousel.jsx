// Copyright (c) 2025 Shivom Parashari. All rights reserved.
// Unauthorized use, distribution, or modification of this file is prohibited.

import React, { useRef, useEffect, useState } from "react";
import "./RecommendationCarousel.css";
import { motion } from "framer-motion";

const RecommendationCarousel = ({
  items,
  autoScroll = false,
  scrollSpeed = 1.2,
}) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef(1);

  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;

    let frameId;

    const scroll = () => {
      const container = containerRef.current;
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed * directionRef.current;

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          directionRef.current = -1;
        } else if (container.scrollLeft <= 0) {
          directionRef.current = 1;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [autoScroll, scrollSpeed, isPaused]);

  // 🖱️ Manual drag scroll logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      className="carousel-container"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {items.map((item, index) => (
        <motion.div
          className="carousel-item"
          key={index}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <img src={item.image} alt={item.name} className="product-img" />
          <div className="info">
            <span className="category">{item.category}</span>
            <h3>{item.name}</h3>
            <p>Recommended for you</p>
            <div className="stars">⭐ ⭐ ⭐ ⭐</div>
            <button className="cart-btn">🛒 Add to Cart</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecommendationCarousel;
