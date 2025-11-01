import React from "react";
import "./App.css";

function DestinationCard({ id, place, country, onDelete }) {
  return (
    <div className="product-card">
      <h3>{place}</h3>
      <p>ID: {id}</p>
      <p>Country: {country}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default DestinationCard;
