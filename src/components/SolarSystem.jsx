// import React, { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import PlanetDetails from "./PlanetDetails";

// export default function SolarSystem() {
//   const containerRef = useRef();
//   const [selectedPlanet, setSelectedPlanet] = useState(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     // Scene and camera
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       container.clientWidth / container.clientHeight,
//       0.1,
//       2000
//     );
//     camera.position.set(0, 100, 200);

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;

//     // Lights
//     const sunLight = new THREE.PointLight(0xffffff, 2);
//     sunLight.position.set(0, 0, 0);
//     scene.add(sunLight);
//     scene.add(new THREE.AmbientLight(0x333333));

//     // Sun
//     const sunGeo = new THREE.SphereGeometry(10, 64, 64);
//     const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
//     const sun = new THREE.Mesh(sunGeo, sunMat);
//     scene.add(sun);

//     // Textures
//     const loader = new THREE.TextureLoader();
//     const textures = {
//       Mercury: loader.load( "/textures/mercury.jpg"),
//       Venus: loader.load("/textures/venus.jpg"),
//       Earth: loader.load("/textures/earth.jpg"),
//       Mars: loader.load("/textures/mars.jpg"),
//       Jupiter: loader.load("/textures/jupiter.jpg"),
//       Saturn: loader.load("/textures/saturn.jpg"),
//       Uranus: loader.load("/textures/uranus.jpg"),
//       Neptune: loader.load("/textures/neptune.jpg"),
//     };

//     // Planets with details
//     const planets = [
//       {
//         name: "Mercury",
//         englishName: "Mercury",
//         radius: 1,
//         distance: 15,
//         speed: 0.04,
//         mass: { massValue: 3.3, massExponent: 23 },
//         gravity: 3.7,
//         density: 5.43,
//         discoveryDate: "Prehistory",
//         moons: [],
//       },
//       {
//         name: "Venus",
//         englishName: "Venus",
//         radius: 2,
//         distance: 22,
//         speed: 0.015,
//         mass: { massValue: 4.87, massExponent: 24 },
//         gravity: 8.87,
//         density: 5.24,
//         discoveryDate: "Prehistory",
//         moons: [],
//       },
//       {
//         name: "Earth",
//         englishName: "Earth",
//         radius: 2.2,
//         distance: 30,
//         speed: 0.01,
//         mass: { massValue: 5.97, massExponent: 24 },
//         gravity: 9.81,
//         density: 5.52,
//         discoveryDate: "Prehistory",
//         moons: [{ name: "Moon" }],
//       },
//       {
//         name: "Mars",
//         englishName: "Mars",
//         radius: 1.5,
//         distance: 38,
//         speed: 0.008,
//         mass: { massValue: 0.642, massExponent: 24 },
//         gravity: 3.71,
//         density: 3.93,
//         discoveryDate: "Prehistory",
//         moons: [{ name: "Phobos" }, { name: "Deimos" }],
//       },
//       {
//         name: "Jupiter",
//         englishName: "Jupiter",
//         radius: 5,
//         distance: 50,
//         speed: 0.004,
//         mass: { massValue: 1898, massExponent: 24 },
//         gravity: 24.79,
//         density: 1.33,
//         discoveryDate: "Prehistory",
//         moons: [
//           { name: "Io" },
//           { name: "Europa" },
//           { name: "Ganymede" },
//           { name: "Callisto" },
//         ],
//       },
//       {
//         name: "Saturn",
//         englishName: "Saturn",
//         radius: 4.5,
//         distance: 65,
//         speed: 0.003,
//         mass: { massValue: 568, massExponent: 24 },
//         gravity: 10.44,
//         density: 0.687,
//         discoveryDate: "Prehistory",
//         moons: [{ name: "Titan" }, { name: "Rhea" }, { name: "Iapetus" }],
//       },
//       {
//         name: "Uranus",
//         englishName: "Uranus",
//         radius: 3.5,
//         distance: 80,
//         speed: 0.002,
//         mass: { massValue: 86.8, massExponent: 24 },
//         gravity: 8.69,
//         density: 1.27,
//         discoveryDate: 1781,
//         moons: [{ name: "Miranda" }, { name: "Ariel" }],
//       },
//       {
//         name: "Neptune",
//         englishName: "Neptune",
//         radius: 3.5,
//         distance: 95,
//         speed: 0.0015,
//         mass: { massValue: 102, massExponent: 24 },
//         gravity: 11.15,
//         density: 1.64,
//         discoveryDate: 1846,
//         moons: [{ name: "Triton" }, { name: "Nereid" }],
//       },
//     ];

//     // Create meshes
//     const planetMeshes = [];
//     planets.forEach((p) => {
//       const geo = new THREE.SphereGeometry(p.radius, 32, 32);
// const mat = new THREE.MeshStandardMaterial({
//   map: textures[p.name],
//   color: 0xffffff,       // ensures texture color is applied properly
//   metalness: 0,           // no metallic shine
//   roughness: 1,           // fully rough to reduce reflectivity
//   transparent: false      // ensures planet is fully opaque
// });
//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.position.x = p.distance;
//       mesh.userData = p; // full planet details
//       scene.add(mesh);

//       // Orbit rings
//       const ringGeo = new THREE.RingGeometry(
//         p.distance - 0.05,
//         p.distance + 0.05,
//         64
//       );
//       const ringMat = new THREE.MeshBasicMaterial({
//         color: 0x888888,
//         side: THREE.DoubleSide,
//       });
//       const ring = new THREE.Mesh(ringGeo, ringMat);
//       ring.rotation.x = Math.PI / 2;
//       scene.add(ring);

//       planetMeshes.push({
//         mesh,
//         distance: p.distance,
//         speed: p.speed,
//         angle: Math.random() * Math.PI * 2,
//       });
//     });

//     // Raycaster & click detection
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     let isDragging = false;

//     controls.addEventListener("start", () => (isDragging = true));
//     controls.addEventListener("end", () => {
//       setTimeout(() => (isDragging = false), 0);
//     });

//     const onPointerDown = (event) => {
//       if (isDragging) return;
//         console.log("Clicked!", mouse, intersects);
//         if (intersects.length > 0) {
//         console.log("Hit planet:", intersects[0].object.userData.englishName);
//         setSelectedPlanet(intersects[0].object.userData);
//         } else {
//         console.log("Missed planet");
//         }

//       const rect = renderer.domElement.getBoundingClientRect();
//       mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(
//         planetMeshes.map((p) => p.mesh)
//       );

//       if (intersects.length > 0) {
//         setSelectedPlanet(intersects[0].object.userData);
//       }
//     };

//     renderer.domElement.addEventListener("pointerdown", onPointerDown);

//     // Animation loop
//     const animate = () => {
//       planetMeshes.forEach((p) => {
//         p.angle += p.speed;
//         p.mesh.position.x = p.distance * Math.cos(p.angle);
//         p.mesh.position.z = p.distance * Math.sin(p.angle);
//       });
//       controls.update();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = container.clientWidth / container.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(container.clientWidth, container.clientHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       controls.dispose();
//       renderer.dispose();
//       window.removeEventListener("resize", handleResize);
//       renderer.domElement.removeEventListener("pointerdown", onPointerDown);
//       container.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <>
//       <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
//       <PlanetDetails data={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
//     </>
//   );
// }


import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const planetData = {
  Mercury: {
    name: "Mercury",
    description: "The smallest planet and closest to the Sun",
    diameter: "4,879 km",
    distance: "57.9 million km from Sun",
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    moons: "0",
    facts: "Mercury has the most extreme temperature variations in the solar system"
  },
  Venus: {
    name: "Venus",
    description: "The hottest planet with a thick toxic atmosphere",
    diameter: "12,104 km",
    distance: "108.2 million km from Sun",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    moons: "0",
    facts: "Venus rotates backwards compared to most planets"
  },
  Earth: {
    name: "Earth",
    description: "Our home planet, the only known planet with life",
    diameter: "12,742 km",
    distance: "149.6 million km from Sun",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    moons: "1 (The Moon)",
    facts: "Earth is the only planet not named after a god"
  },
  Mars: {
    name: "Mars",
    description: "The Red Planet with the largest volcano in the solar system",
    diameter: "6,779 km",
    distance: "227.9 million km from Sun",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    moons: "2 (Phobos and Deimos)",
    facts: "Mars has seasons similar to Earth due to its tilted axis"
  },
  Jupiter: {
    name: "Jupiter",
    description: "The largest planet, a gas giant with a Great Red Spot",
    diameter: "139,820 km",
    distance: "778.5 million km from Sun",
    dayLength: "9.9 hours",
    yearLength: "12 Earth years",
    moons: "95+ known moons",
    facts: "Jupiter's mass is greater than all other planets combined"
  },
  Saturn: {
    name: "Saturn",
    description: "Known for its spectacular ring system",
    diameter: "116,460 km",
    distance: "1.43 billion km from Sun",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
    moons: "146+ known moons",
    facts: "Saturn's rings are made mostly of ice particles"
  },
  Uranus: {
    name: "Uranus",
    description: "An ice giant that rotates on its side",
    diameter: "50,724 km",
    distance: "2.87 billion km from Sun",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    moons: "27+ known moons",
    facts: "Uranus appears blue-green due to methane in its atmosphere"
  },
  Neptune: {
    name: "Neptune",
    description: "The windiest planet with supersonic storms",
    diameter: "49,244 km",
    distance: "4.50 billion km from Sun",
    dayLength: "16 hours",
    yearLength: "165 Earth years",
    moons: "14+ known moons",
    facts: "Neptune has the fastest winds in the solar system"
  }
};

export default function SolarSystem() {
  const containerRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const planetMeshesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 100, 200);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const sunLight = new THREE.PointLight(0xffffff, 2, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x333333));

    // Textures loader
    const loader = new THREE.TextureLoader();
    const textures = {
      Mercury: loader.load("/textures/mercury.jpg"),
      Venus: loader.load("/textures/venus.jpg"),
      Earth: loader.load("/textures/earth.jpg"),
      Mars: loader.load("/textures/mars.jpg"),
      Jupiter: loader.load("/textures/jupiter.jpg"),
      Saturn: loader.load("/textures/saturn.jpg"),
      Uranus: loader.load("/textures/uranus.jpg"),
      Neptune: loader.load("/textures/neptune.jpg"),
    };

    // Sun
    const sunGeo = new THREE.SphereGeometry(10, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Planet data
    const planets = [
      { name: "Mercury", radius: 1, distance: 15, speed: 0.04 },
      { name: "Venus", radius: 2, distance: 22, speed: 0.015 },
      { name: "Earth", radius: 2.2, distance: 30, speed: 0.01 },
      { name: "Mars", radius: 1.5, distance: 38, speed: 0.008 },
      { name: "Jupiter", radius: 5, distance: 50, speed: 0.004 },
      { name: "Saturn", radius: 4.5, distance: 65, speed: 0.003 },
      { name: "Uranus", radius: 3.5, distance: 80, speed: 0.002 },
      { name: "Neptune", radius: 3.5, distance: 95, speed: 0.0015 },
    ];

    const planetMeshes = [];

    planets.forEach((p) => {
      // Planet mesh
      const geo = new THREE.SphereGeometry(p.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({ map: textures[p.name] });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = p.distance;
      mesh.userData = { planetName: p.name }; // Store planet name for click detection
      scene.add(mesh);

      // Orbit ring
      const ringGeo = new THREE.RingGeometry(p.distance - 0.05, p.distance + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      planetMeshes.push({ 
        mesh, 
        distance: p.distance, 
        speed: p.speed, 
        angle: Math.random() * Math.PI * 2 
      });
    });

    planetMeshesRef.current = planetMeshes;

    // Click handler
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        planetMeshes.map(p => p.mesh)
      );

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object.userData.planetName;
        setSelectedPlanet(clickedPlanet);
      }
    };

    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.style.cursor = 'pointer';

    // Animate
    const animate = () => {
      planetMeshes.forEach((p) => {
        p.angle += p.speed;
        p.mesh.position.x = p.distance * Math.cos(p.angle);
        p.mesh.position.z = p.distance * Math.sin(p.angle);
      });
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      if (container) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
      
      {selectedPlanet && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedPlanet(null)}
        >
          <div 
            style={{
              backgroundColor: '#1a1a2e',
              padding: '40px',
              borderRadius: '20px',
              maxWidth: '600px',
              color: 'white',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '2px solid #4a4a6a'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ 
              fontSize: '2.5em', 
              marginTop: 0,
              marginBottom: '10px',
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {planetData[selectedPlanet].name}
            </h2>
            <p style={{ 
              fontSize: '1.1em', 
              color: '#b0b0d0',
              marginBottom: '30px',
              fontStyle: 'italic'
            }}>
              {planetData[selectedPlanet].description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div>
                <strong style={{ color: '#8b8baa' }}>Diameter:</strong>
                <p style={{ margin: '5px 0 15px 0' }}>{planetData[selectedPlanet].diameter}</p>
              </div>
              <div>
                <strong style={{ color: '#8b8baa' }}>Distance from Sun:</strong>
                <p style={{ margin: '5px 0 15px 0' }}>{planetData[selectedPlanet].distance}</p>
              </div>
              <div>
                <strong style={{ color: '#8b8baa' }}>Day Length:</strong>
                <p style={{ margin: '5px 0 15px 0' }}>{planetData[selectedPlanet].dayLength}</p>
              </div>
              <div>
                <strong style={{ color: '#8b8baa' }}>Year Length:</strong>
                <p style={{ margin: '5px 0 15px 0' }}>{planetData[selectedPlanet].yearLength}</p>
              </div>
              <div>
                <strong style={{ color: '#8b8baa' }}>Moons:</strong>
                <p style={{ margin: '5px 0 15px 0' }}>{planetData[selectedPlanet].moons}</p>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#2a2a4a', 
              padding: '15px', 
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <strong style={{ color: '#8b8baa' }}>Fun Fact:</strong>
              <p style={{ margin: '10px 0 0 0' }}>{planetData[selectedPlanet].facts}</p>
            </div>
            
            <button
              onClick={() => setSelectedPlanet(null)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1em',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#764ba2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}