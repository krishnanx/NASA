// // src/components/PlanetModel.jsx
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import "./PlanetsModel.css";

// export default function PlanetModel({ planet }) {
//   const canvasRef = useRef(null);
//   const planetMeshRef = useRef(null);

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

//         <div className="planet-image">
//           <canvas ref={canvasRef} />
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/PlanetModel.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
 // ✅ for URL slug
import planets from "./planets"; // ✅ your planets data
import "./PlanetsModel.css";
import { useLocation,useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";

export default function PlanetModel() {

  const location = useLocation();
  const planetName = location.state; // { name: "Mars", moons: 2 }
  const planet = planets.find((p) => p.name === planetName);
  const navigate = useNavigate()
  //const planet = planets[planetNo];
  console.log("Planet:",planet)
  const canvasRef = useRef(null);
  const planetMeshRef = useRef(null);
  const handleDeepZoom = () => {
    if(planetName == "Mars"){
      navigate("/planet/explore")
    }
    else{

    }
  }
  useEffect(() => {
    if (!planet || !canvasRef.current) return;

    // === three.js setup ===
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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 2, 4);
    scene.add(directionalLight);

    // Planet sphere
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(planet.textureUrl);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.9,
    });

    const planetMesh = new THREE.Mesh(geometry, material);
    planetMeshRef.current = planetMesh;
    scene.add(planetMesh);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = false;

    // Animate
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      planetMesh.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Responsive resize
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth * 0.4, 500);
      renderer.setSize(newSize, newSize);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      if (texture && texture.dispose) texture.dispose();
      renderer.dispose();
    };
  }, [planet]);

  if (!planet) {
    return (
      <div style={{ color: "white", padding: 40 }}>
        <h2>Planet not found</h2>
      </div>
    );
  }

  return (
    <div className="planet-container">
      <div className="planet-header">
        <div className="planet-info">
          <h1 className="planet-name">{planet.name}</h1>
          <p className="planet-short">{planet.shortDescription}</p>

          <div className="planet-long-cards">
            {Object.entries(planet.longDescription).map(([key, value], index) => (
              <div className="description-card" key={index}>
                <h3>{key}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="planet-image" onClick={()=>handleDeepZoom()}>
         
          <canvas ref={canvasRef} />
          <Tooltip/>
        </div>
        
      </div>
    </div>
  );
}

