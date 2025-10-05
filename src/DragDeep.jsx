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
    const dziUrl = `http://localhost:8000/test_output/0/test_output.dzi`;
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

// import React, { useEffect, useRef, useState } from "react";
// import OpenSeadragon from "openseadragon";
// import { useSelector } from "react-redux";

// const DeepZoomViewer = () => {
//   const viewerRef = useRef(null);
//   const osdRef = useRef(null);
//   const [message, setMessage] = useState("Loading...");
//   const espNo = useSelector((state) => state.esp.espNo);

//   // 🔴 Store overlays so we can remove them before adding new ones
//   const overlaysRef = useRef([]);

//   useEffect(() => {
//     if (!viewerRef.current) return;

//     // ✅ Initialize OpenSeadragon once
//     if (!osdRef.current) {
//       osdRef.current = OpenSeadragon({
//         element: viewerRef.current,
//         prefixUrl:
//           "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
//         showNavigationControl: true,
//       });

//       osdRef.current.addHandler("tile-load-failed", (event) => {
//         console.error("❌ Tile load failed:", event.tile.url);
//         setMessage("⚠️ Failed loading tiles, check console.");
//       });

//       osdRef.current.addHandler("tile-loaded", (event) => {
//         console.log("✅ Tile loaded:", event.tile.url);
//         setMessage("✅ DZI loaded successfully");
//       });
//     }

//     // 🛰️ Load new DZI when espNo changes
//     if (espNo !== undefined && espNo !== null) {
//       const dziUrl = `http://localhost:8000/test_output/${espNo}/test_output.dzi`;
//       osdRef.current.open(dziUrl);
//       setMessage("📡 Loading new image...");

//       // ✅ After image loads, fetch and overlay annotations
//       osdRef.current.addOnceHandler("open", () => {
//         fetchAnnotationsAndOverlay(espNo);
//       });
//     }
//   }, [espNo]);

//   // ✅ Fetch from Flask and add overlays
//   const fetchAnnotationsAndOverlay = async (espNo) => {
//     try {
//       // Remove previous overlays
//       overlaysRef.current.forEach((el) => osdRef.current.removeOverlay(el));
//       overlaysRef.current = [];

//       // Request annotation from backend
//       const res = await fetch("http://localhost:5000/detect", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           tile_path: `test_output/${espNo}/test_output_files/0/0_0.png`, // adjust if needed
//         }),
//       });

//       const data = await res.json();
//       console.log("🧠 Received annotations:", data);

//       // Add overlays
//       data.features.forEach((feature, index) => {
//         const { x, y, w, h } = feature;

//         const div = document.createElement("div");
//         div.className = "annotation-box";
//         div.style.border = "2px solid red";
//         div.style.background = "rgba(255,0,0,0.2)";
//         div.innerText = `${index + 1}`;

//         // Important: Add overlay in image coordinates
//         osdRef.current.addOverlay({
//           element: div,
//           location: new OpenSeadragon.Rect(x, y, w, h),
//         });

//         overlaysRef.current.push(div); // Keep track to remove later
//       });
//     } catch (err) {
//       console.error("❌ Error fetching annotations:", err);
//       setMessage("❌ Failed to fetch annotations");
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         background: "black",
//       }}
//     >
//       {/* Viewer container */}
//       <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />

//       {/* Status Message */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 10,
//           left: "50%",
//           transform: "translateX(-50%)",
//           color: "white",
//           background: "rgba(0,0,0,0.5)",
//           padding: "6px 12px",
//           borderRadius: "6px",
//           fontSize: "14px",
//         }}
//       >
//         {message}
//       </div>
//     </div>
//   );
// };

// export default DeepZoomViewer;

