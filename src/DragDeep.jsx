import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";

const DragDeep = () => {
  const viewerRef = useRef(null);
  const osdRef = useRef(null);
  const [message, setMessage] = useState("Drag & drop a .dzi file here");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (viewerRef.current && !osdRef.current) {
      osdRef.current = OpenSeadragon({
        element: viewerRef.current,
        prefixUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
        showNavigationControl: true,
      });
    }
  }, []);

  useEffect(() => {
  if (viewerRef.current && !osdRef.current) {
    osdRef.current = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
      showNavigationControl: true,
    });

    // 🔍 Log tile requests
    osdRef.current.addHandler("tile-load-failed", (event) => {
      console.error("❌ Tile load failed:", event.tile.url);
    });

    osdRef.current.addHandler("tile-loaded", (event) => {
      console.log("✅ Tile loaded:", event.tile.url);
    });
  }
}, []);


  // Handle drop
    const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const dziFile = files.find((f) => f.name.endsWith(".dzi"));

    if (!dziFile) {
        setMessage("⚠️ Please drop a valid .dzi file");
        return;
    }

    // Assume your server serves dzimages/ under public/
    const dziUrl = `http://localhost:3000/dzimages/${dziFile.name}`;

    setMessage(`✅ Loaded ${dziFile.name}`);
    osdRef.current.open(dziUrl);
    };


  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#111",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />

      {dragActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            border: "2px dashed #aaa",
            zIndex: 10,
          }}
        >
          Drop your .dzi file here
        </div>
      )}

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

export default DragDeep;
