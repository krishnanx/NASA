import React, { useState, useEffect } from "react";
import "./App.css";
import DeepZoomViewer from "./DeepZoomViewer";
import DragDeep from "./DragDeep";
import SolarSystem from "./components/SolarSystem";
import Loader from "./components/Loader"; // renamed for consistency
import MarsExplore from './pages/MarsExplore'
function App() {
  
  return (
    <div className="App">
     
        <>
          {/* Solar System as landing page */}
          <SolarSystem />
           <MarsExplore />
          {/* Keep your existing components */}
          {/* <DeepZoomViewer /> */}
          <DragDeep />
        </>
    </div>
  );
}

export default App;
