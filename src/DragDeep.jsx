import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import { useSelector } from "react-redux";

const DeepZoomViewer = () => {
  const viewerRef = useRef(null);
  const osdRef = useRef(null);
  const [message, setMessage] = useState("Loading DZI...");
  const espNo = useSelector((state) => state.esp.espNo);

  // Hardcoded width and height for 6 images
  const imageSizes = {
    0: { width: 14258, height: 25214 },
    1: { width: 4842, height: 26829 },
    2: { width: 4113, height: 16178 },
    3: { width: 5393, height: 26852 },
    4: { width: 19341, height: 114938 },
    5: { width: 7780, height: 45959 },
  };

  // Relative fractions for marker placement for each image
  const relativeMarkers = {
    0: [{ xFactor: 0.5, yFactor: 0.5, label: "Jezero Crater" }],
    1: [{ xFactor: 0.6, yFactor: 0.5, label: "Viking 1" }],
    2: [{ xFactor: 0.9, yFactor: 0.5, label: "Viking 2" }],
    3: [{ xFactor: -0.5, yFactor: 0.5, label: "Insight Lander" }],
    4: [{ xFactor: -0.1, yFactor: 0.121, label: "Opportunity Rover" }],
    5: [{ xFactor: 2.8, yFactor: 0.5, label: "Spirit Rover" }],
  };

  useEffect(() => {
    if (!viewerRef.current) return;

    // Initialize viewer only once
    if (!osdRef.current) {
      osdRef.current = OpenSeadragon({
        element: viewerRef.current,
        prefixUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
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

   // Add auto-rotate for portrait images
      osdRef.current.addHandler("open", () => {
        const item = osdRef.current.world.getItemAt(0);
        if (!item) return;

        const { x: width, y: height } = item.getContentSize();
        if (height > width) {
          item.setRotation(97); // Rotate portrait to landscape
          osdRef.current.viewport.goHome(); // Reset zoom/pan for rotated image
          console.log("🔄 Rotated portrait image to landscape");
        }
      });
    
  

    if (espNo >= 0 && espNo <= 5) {
      const dziUrl = `https://deepzoom.devark.co.in/${espNo}/test_output.dzi`;
      console.log("🛰️ Loading:", dziUrl);
      setMessage("Loading DZI...");

      osdRef.current.open(dziUrl);

      osdRef.current.addHandler("open", () => {
        const viewer = osdRef.current;
        const item = viewer.world.getItemAt(0);
        if (!item) return;

        const { width: imageWidth, height: imageHeight } = imageSizes[espNo];

        // Clear previous overlays
        viewer.overlays.forEach((overlay) =>
          viewer.removeOverlay(overlay.element)
        );

        // Compute pixel positions from relative fractions
        const markers = relativeMarkers[espNo] || [];
        markers.forEach((m) => {
          const pixelX = m.xFactor * imageWidth;
          const pixelY = m.yFactor * imageHeight;

          // Convert pixel → viewport coordinates
          const vpPoint = viewer.viewport.imageToViewportCoordinates(
            pixelX,
            pixelY
          );

          // Create red marker
          const marker = document.createElement("div");
          marker.style.width = "16px";
          marker.style.height = "16px";
          marker.style.background = "red";
          marker.style.border = "2px solid white";
          marker.style.borderRadius = "50%";
          marker.style.cursor = "pointer";
          marker.title = m.label;

          viewer.addOverlay({ element: marker, location: vpPoint });
        });

        setMessage(`✅ Image ${espNo} loaded with dynamic marker`);
      });
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
      <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />
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
