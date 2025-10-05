import React, { useRef, useEffect } from "react";
import "./App.css";
import DeepZoomViewer from "./DeepZoomViewer";
import DragDeep from "./DragDeep";
import SolarSystem from "./components/SolarSystem";
import Loader from "./components/Loader"; // renamed for consistency
import MarsExplore from './pages/MarsExplore'
import PlanetModel from "./components/PlanetsModel"
import { Route,Routes,useLocation } from "react-router-dom";
export default function App() {
  const location = useLocation();

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      {/* SolarSystem is always mounted */}
      <div
        style={{
          display: location.pathname === "/" ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <SolarSystem />
      </div>

      {/* Other routes */}
      <Routes>
        <Route path="/planet" element={<PlanetModel />} />
        <Route path="/planet/explore" element={<MarsExplore />} />
        <Route path="/planets/deepzoom" element={<DragDeep />} />
      </Routes>
    </div>
  );
}

