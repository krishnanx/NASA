import React from "react";

export default function PlanetDetails({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="planet-details">
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "1px solid white",
          color: "white",
          padding: "4px 8px",
          marginBottom: "10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Close
      </button>
      <h2>{data.englishName}</h2>
      <p>
        <strong>Mass:</strong> {data.mass.massValue}e{data.mass.massExponent} kg
      </p>
      <p>
        <strong>Gravity:</strong> {data.gravity} m/s²
      </p>
      <p>
        <strong>Density:</strong> {data.density} g/cm³
      </p>
      <p>
        <strong>Discovered:</strong> {data.discoveryDate || "Unknown"}
      </p>
      <p>
        <strong>Moons:</strong> {data.moons ? data.moons.length : 0}
      </p>
    </div>
  );
}