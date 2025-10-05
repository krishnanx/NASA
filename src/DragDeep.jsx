import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import { useSelector } from 'react-redux';

const DeepZoomViewer = () => {
  const viewerRef = useRef(null);
  const osdRef = useRef(null);
  const [message, setMessage] = useState("Loading test_output.dzi...");
  const espNo = useSelector((state) => state.esp.espNo);


useEffect(() => {
  if (!viewerRef.current) return;

  // Create viewer if it doesn’t exist
  if (!osdRef.current) {
    osdRef.current = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
      showNavigationControl: true,
    });

    osdRef.current.addHandler("tile-load-failed", (event) => {
      console.error("❌ Tile load failed:", event.tile.url);
      setMessage("⚠️ Failed loading tiles, check console.");
    });

    osdRef.current.addHandler("tile-loaded", (event) => {
      console.log("✅ Tile loaded:", event.tile.url);
      setMessage("✅ DZI loaded successfully");
    });
  }

  // When espNo changes, load new DZI
  if (espNo !== undefined && espNo !== null) {
    const dziUrl = `http://localhost:8000/test_output/${espNo}/test_output.dzi`;
    console.log("🛰️ Loading:", dziUrl);
    osdRef.current.open(dziUrl);
  }
}, [espNo]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "black",
      }}
    >
      {/* Viewer */}
     <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          background: "rgba(0,0,0,0.5)",
          padding: "6px 12px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default DeepZoomViewer;


