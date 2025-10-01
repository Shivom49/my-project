import React, { useState } from "react";
import "./App.css";
import DestinationCard from "./DestinationCard";

function App() {
  const [destinations, setDestinations] = useState([
    { id: 1, place: "Paris", country: "France" },
    { id: 2, place: "Tokyo", country: "Japan" },
    { id: 3, place: "New York", country: "USA" },
  ]);

  const handleDelete = (id) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  return (
    <div className="product-container">
      <h2>Destinations List</h2>
      <div className="product-list">
        {destinations.map((d) => (
          <DestinationCard
            key={d.id}
            id={d.id}
            place={d.place}
            country={d.country}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
