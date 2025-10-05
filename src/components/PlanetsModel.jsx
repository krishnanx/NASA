// // // src/components/PlanetModel.jsx
// // import React, { useEffect, useRef } from "react";
// // import * as THREE from "three";
// // import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// // import "./PlanetsModel.css";

// // export default function PlanetModel({ planet }) {
// //   const canvasRef = useRef(null);
// //   const planetMeshRef = useRef(null);

// //   useEffect(() => {
// //     if (!planet || !canvasRef.current) return;

// //     // === three.js setup ===
// //     const scene = new THREE.Scene();

// //     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
// //     camera.position.z = 3;

// //     const renderer = new THREE.WebGLRenderer({
// //       canvas: canvasRef.current,
// //       alpha: true,
// //       antialias: true,
// //     });
// //     const size = Math.min(window.innerWidth * 0.4, 500);
// //     renderer.setSize(size, size);
// //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// //     // Lights
// //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
// //     scene.add(ambientLight);
// //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// //     directionalLight.position.set(3, 2, 4);
// //     scene.add(directionalLight);

// //     // Planet sphere
// //     const geometry = new THREE.SphereGeometry(1, 128, 128);
// //     const textureLoader = new THREE.TextureLoader();
// //     const texture = textureLoader.load(planet.textureUrl);

// //     const material = new THREE.MeshStandardMaterial({
// //       map: texture,
// //       metalness: 0.1,
// //       roughness: 0.9,
// //     });

// //     const planetMesh = new THREE.Mesh(geometry, material);
// //     planetMeshRef.current = planetMesh;
// //     scene.add(planetMesh);

// //     // OrbitControls
// //     const controls = new OrbitControls(camera, renderer.domElement);
// //     controls.enableDamping = true;
// //     controls.enableZoom = true;
// //     controls.autoRotate = false;

// //     // Animate
// //     let rafId;
// //     const animate = () => {
// //       rafId = requestAnimationFrame(animate);
// //       planetMesh.rotation.y += 0.002;
// //       controls.update();
// //       renderer.render(scene, camera);
// //     };
// //     animate();

// //     // Responsive resize
// //     const handleResize = () => {
// //       const newSize = Math.min(window.innerWidth * 0.4, 500);
// //       renderer.setSize(newSize, newSize);
// //       camera.updateProjectionMatrix();
// //     };
// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       cancelAnimationFrame(rafId);
// //       window.removeEventListener("resize", handleResize);
// //       geometry.dispose();
// //       material.dispose();
// //       if (texture && texture.dispose) texture.dispose();
// //       renderer.dispose();
// //     };
// //   }, [planet]);

// //   if (!planet) {
// //     return (
// //       <div style={{ color: "white", padding: 40 }}>
// //         <h2>Planet not found</h2>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="planet-container">
// //       <div className="planet-header">
// //         <div className="planet-info">
// //           <h1 className="planet-name">{planet.name}</h1>
// //           <p className="planet-short">{planet.shortDescription}</p>

// //           <div className="planet-long-cards">
// //             {Object.entries(planet.longDescription).map(([key, value], index) => (
// //               <div className="description-card" key={index}>
// //                 <h3>{key}</h3>
// //                 <p>{value}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="planet-image">
// //           <canvas ref={canvasRef} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // src/components/PlanetModel.jsx
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//  // ✅ for URL slug
// import planets from "./planets"; // ✅ your planets data
// import "./PlanetsModel.css";
// import { useLocation,useNavigate } from "react-router-dom";
// import Tooltip from "./Tooltip";

// export default function PlanetModel() {

//   const location = useLocation();
//   const planetName = location.state; // { name: "Mars", moons: 2 }
//   const planet = planets.find((p) => p.name === planetName);
//   const navigate = useNavigate()
//   //const planet = planets[planetNo];
//   console.log("Planet:",planet)
//   const canvasRef = useRef(null);
//   const planetMeshRef = useRef(null);
//   const handleDeepZoom = () => {
//     if(planetName == "Mars"){
//       navigate("/planet/explore")
//     }
//     else{

//     }
//   }
//   useEffect(() => {
//     if (!planet || !canvasRef.current) return;

//     // === three.js setup ===
//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
//     camera.position.z = 3;

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true,
//     });
//     const size = Math.min(window.innerWidth * 0.4, 500);
//     renderer.setSize(size, size);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(3, 2, 4);
//     scene.add(directionalLight);

//     // Planet sphere
//     const geometry = new THREE.SphereGeometry(1, 128, 128);
//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(planet.textureUrl);

//     const material = new THREE.MeshStandardMaterial({
//       map: texture,
//       metalness: 0.1,
//       roughness: 0.9,
//     });

//     const planetMesh = new THREE.Mesh(geometry, material);
//     planetMeshRef.current = planetMesh;
//     scene.add(planetMesh);

//     // OrbitControls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.enableZoom = true;
//     controls.autoRotate = false;

//     // Animate
//     let rafId;
//     const animate = () => {
//       rafId = requestAnimationFrame(animate);
//       planetMesh.rotation.y += 0.002;
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Responsive resize
//     const handleResize = () => {
//       const newSize = Math.min(window.innerWidth * 0.4, 500);
//       renderer.setSize(newSize, newSize);
//       camera.updateProjectionMatrix();
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       cancelAnimationFrame(rafId);
//       window.removeEventListener("resize", handleResize);
//       geometry.dispose();
//       material.dispose();
//       if (texture && texture.dispose) texture.dispose();
//       renderer.dispose();
//     };
//   }, [planet]);

//   if (!planet) {
//     return (
//       <div style={{ color: "white", padding: 40 }}>
//         <h2>Planet not found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="planet-container">
//       <div className="planet-header">
//         <div className="planet-info">
//           <h1 className="planet-name">{planet.name}</h1>
//           <p className="planet-short">{planet.shortDescription}</p>

//           <div className="planet-long-cards">
//             {Object.entries(planet.longDescription).map(([key, value], index) => (
//               <div className="description-card" key={index}>
//                 <h3>{key}</h3>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="planet-image" onClick={()=>handleDeepZoom()}>
         
//           <canvas ref={canvasRef} />
//           <Tooltip/>
//         </div>
        
//       </div>
//     </div>
//   );
// }
// src/components/PlanetModel.jsx
// src/components/PlanetModel.jsx
// src/components/PlanetModel.jsx
// src/components/PlanetModel.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as d3 from "d3";
import planets from "./planets";
import "./PlanetsModel.css";
import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

/* =========================================================
   GLOBAL D3 CONSTANTS
   ========================================================= */
const WIDTH = 900;
const HEIGHT = 400;
const MARGIN = { top: 30, right: 40, bottom: 50, left: 60 };
const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

/* =========================================================
   CREATE SVG BASE
   ========================================================= */
function createSvg(container) {
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const g = svg
    .append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${INNER_HEIGHT})`);
  g.append("g").attr("class", "y-axis");

  return { svg, g };
}

/* =========================================================
   TOOLTIP SETUP
   ========================================================= */
function createTooltip(container) {
  return d3
    .select(container)
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
}

/* =========================================================
   UNIVERSAL HOVER INTERACTION
   ========================================================= */
function addHover(svg, x, y, data, tooltip, xKey, yKey, formatX, formatY) {
  const bisect = d3.bisector((d) => d[xKey]).left;
  const focus = svg
    .append("circle")
    .attr("r", 5)
    .attr("fill", "#fff")
    .attr("stroke", "#7be7ff")
    .attr("stroke-width", 2)
    .style("display", "none");

  svg
    .append("rect")
    .attr("width", INNER_WIDTH)
    .attr("height", INNER_HEIGHT)
    .style("fill", "transparent")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const xm = x.invert(mx);
      const i = bisect(data, xm, 1);
      const d0 = data[i - 1];
      const d1 = data[i] || d0;
      const d = xm - d0[xKey] > d1[xKey] - xm ? d1 : d0;

      focus
        .style("display", null)
        .attr("cx", x(d[xKey]))
        .attr("cy", y(d[yKey]));

      tooltip
        .style("opacity", 1)
        .html(
          `<strong>${formatX(d[xKey])}</strong><br/>${formatY(d[yKey])}`
        )
        .style("left", `${x(d[xKey]) + 80}px`)
        .style("top", `${y(d[yKey]) + 30}px`);
    })
    .on("mouseleave", () => {
      focus.style("display", "none");
      tooltip.style("opacity", 0);
    });
}

/* =========================================================
   PLANET-SPECIFIC CHARTS
   ========================================================= */

// Mercury
function mercuryChart(container) {
  const { g, svg } = createSvg(container);
  const tooltip = createTooltip(container);
  const data = d3.range(0, 48).map((i) => ({
    hour: i,
    temp: 100 + 200 * Math.sin((i / 48) * Math.PI * 2),
  }));

  const x = d3.scaleLinear().domain([0, 48]).range([0, INNER_WIDTH]);
  const y = d3.scaleLinear().domain([-200, 400]).range([INNER_HEIGHT, 0]);
  const line = d3
    .line()
    .x((d) => x(d.hour))
    .y((d) => y(d.temp))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#7be7ff")
    .attr("stroke-width", 3)
    .attr("d", line);

  addHover(svg, x, y, data, tooltip, "hour", "temp", d3.format(".0f"), (v) => `${v.toFixed(1)}°C`);
  g.select(".x-axis").call(d3.axisBottom(x));
  g.select(".y-axis").call(d3.axisLeft(y));
}

// Venus
function venusChart(container) {
  const { g, svg } = createSvg(container);
  const tooltip = createTooltip(container);
  const data = d3.range(0, 12).map((i) => ({
    altitude: i * 5,
    pressure: 92 - i * 7 + Math.random() * 2,
  }));

  const x = d3.scaleLinear().domain([0, 60]).range([0, INNER_WIDTH]);
  const y = d3.scaleLinear().domain([0, 100]).range([INNER_HEIGHT, 0]);
  const line = d3
    .line()
    .x((d) => x(d.altitude))
    .y((d) => y(d.pressure))
    .curve(d3.curveCatmullRom);

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#ff6f61")
    .attr("stroke-width", 3)
    .attr("d", line);

  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.altitude))
    .attr("cy", (d) => y(d.pressure))
    .attr("r", 5)
    .attr("fill", "#ff6f61");

  addHover(svg, x, y, data, tooltip, "altitude", "pressure", (v) => `${v} km`, (v) => `${v.toFixed(1)} atm`);
  g.select(".x-axis").call(d3.axisBottom(x));
  g.select(".y-axis").call(d3.axisLeft(y));
}

// Earth
function earthChart(container) {
  const { g } = createSvg(container);
  const data = [
    { zone: "Tropical", temp: 30 },
    { zone: "Arid", temp: 35 },
    { zone: "Temperate", temp: 20 },
    { zone: "Continental", temp: 10 },
    { zone: "Polar", temp: -15 },
  ];

  const x = d3.scaleBand().domain(data.map((d) => d.zone)).range([0, INNER_WIDTH]).padding(0.3);
  const y = d3.scaleLinear().domain([-20, 40]).range([INNER_HEIGHT, 0]);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.zone))
    .attr("y", (d) => y(Math.max(0, d.temp)))
    .attr("height", (d) => Math.abs(y(d.temp) - y(0)))
    .attr("width", x.bandwidth())
    .attr("fill", "#7be7ff");

  g.select(".x-axis").call(d3.axisBottom(x));
  g.select(".y-axis").call(d3.axisLeft(y));
}

// (other planet chart functions same as before — jupiterChart, saturnChart, uranusChart, neptuneChart)
// ... keep them from your working version above.

/* =========================================================
   CHART MAPPING
   ========================================================= */
const chartMap = {
  Mercury: mercuryChart,
  Venus: venusChart,
  Earth: earthChart,
  // include other planets as before
};
/* =========================================================
   GRAPH TITLES
   ========================================================= */
const graphTitles = {
  Mercury: "Surface Temperature Variation",
  Venus: "Atmospheric Pressure vs Altitude",
  Earth: "Average Temperature by Climate Zone",
  Mars: "Dust Storm Frequency Over Time",
  Jupiter: "Wind Speed Variation by Latitude",
  Saturn: "Ring Particle Size Distribution",
  Uranus: "Axial Tilt vs Seasonal Changes",
  Neptune: "Methane Absorption Spectrum",
};
/* =========================================================
   MAIN COMPONENT
   ========================================================= */
export default function PlanetModel() {
  const location = useLocation();
  const planetName = typeof location.state === "string" ? location.state : location.state?.name;
  const planet = planets.find((p) => p.name === planetName);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const handleDeepZoom = () => {
    if (planetName === "Mars") {
      navigate("/planet/explore");
    } else {
      toast.info("Coming soon! Meanwhile, check out Mars 🌌", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton:false,
        onClick: () => navigate("/planet",{ state: "Mars" })
      });
    }
  };
  useEffect(() => {
    if (!planet || !canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    const size = Math.min(window.innerWidth * 0.4, 500);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(3, 2, 4);
    scene.add(dir);

    const geo = new THREE.SphereGeometry(1, 128, 128);
    const texture = new THREE.TextureLoader().load(planet.textureUrl);
    const mat = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.1, roughness: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      mesh.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [planet]);

  useEffect(() => {
    if (!planet || !chartRef.current) return;
    d3.select(chartRef.current).selectAll("*").remove();
    const draw = chartMap[planet.name] || mercuryChart;
    draw(chartRef.current);
  }, [planet?.name]);

  if (!planet)
    return (
      <div style={{ color: "#fff", padding: 40 }}>
        <h2>Planet not found</h2>
      </div>
    );

  return (
    <div className="planet-container">
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="planet-header">
        <div className="planet-info">
          <h1 className="planet-name">{planet.name}</h1>
          <p className="planet-short">{planet.shortDescription}</p>
          <div className="planet-image" onClick={handleDeepZoom}>
          <canvas ref={canvasRef} />
          <Tooltip />
        </div>
          <div className="planet-long-cards">
            {Object.entries(planet.longDescription).map(([key, val], i) => (
              <div className="description-card" key={i}>
                <h3>{key}</h3>
                <p>{val}</p>
              </div>
            ))}
          </div>
        </div>
       </div> 

        {/* <div className="planet-image" onClick={handleDeepZoom}>
          <canvas ref={canvasRef} />
          <Tooltip />
        </div> */}
      {/* </div> */}

      <div className="chart-container">
        <h2 className="chart-title">{planet.name} — Interactive Data Visualization</h2>
        <p className="chart-subtitle">
    {graphTitles[planet.name] || "Planetary Observation Graph"}
        </p>
        <div ref={chartRef} className="chart-area"></div>
      </div>
   </div> 
  );
}
