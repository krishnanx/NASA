import React, { useState, useEffect } from "react";
import "./App.css";
import DeepZoomViewer from "./DeepZoomViewer";
import DragDeep from "./DragDeep";
import SolarSystem from "./components/SolarSystem";
import Loader from "./components/Loader"; // renamed for consistency
import MarsExplore from './pages/MarsExplore'
import PlanetModel from "./components/PlanetsModel"
import { Route,Routes } from "react-router-dom";
function App() {
  
  return (
    <div className="App">
     
        <>
          {/* Solar System as landing page */}
        <Routes>
          <Route path="/" element={<SolarSystem />} />
          <Route path="/planet" element={<PlanetModel />} />
          <Route path="/planet/explore" element={<MarsExplore />} />
          <Route path="/planets/deepzoom" element={<DragDeep />} />
        </Routes>
        </>
    </div>
  );
}

export default App;
