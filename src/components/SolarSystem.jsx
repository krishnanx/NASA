import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const planetData = {
  Mercury: {
    name: "Mercury",
    description: "The smallest planet and closest to the Sun",
    diameter: "4,879 km",
    distance: "57.9 million km from Sun",
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    moons: "0",
    facts: "Mercury has the most extreme temperature variations in the solar system",
  },
  Venus: {
    name: "Venus",
    description: "The hottest planet with a thick toxic atmosphere",
    diameter: "12,104 km",
    distance: "108.2 million km from Sun",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    moons: "0",
    facts: "Venus rotates backwards compared to most planets",
  },
  Earth: {
    name: "Earth",
    description: "Our home planet, the only known planet with life",
    diameter: "12,742 km",
    distance: "149.6 million km from Sun",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    moons: "1 (The Moon)",
    facts: "Earth is the only planet not named after a god",
  },
  Mars: {
    name: "Mars",
    description: "The Red Planet with the largest volcano in the solar system",
    diameter: "6,779 km",
    distance: "227.9 million km from Sun",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    moons: "2 (Phobos and Deimos)",
    facts: "Mars has seasons similar to Earth due to its tilted axis",
  },
  Jupiter: {
    name: "Jupiter",
    description: "The largest planet, a gas giant with a Great Red Spot",
    diameter: "139,820 km",
    distance: "778.5 million km from Sun",
    dayLength: "9.9 hours",
    yearLength: "12 Earth years",
    moons: "95+ known moons",
    facts: "Jupiter's mass is greater than all other planets combined",
  },
  Saturn: {
    name: "Saturn",
    description: "Known for its spectacular ring system",
    diameter: "116,460 km",
    distance: "1.43 billion km from Sun",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
    moons: "146+ known moons",
    facts: "Saturn's rings are made mostly of ice particles",
  },
  Uranus: {
    name: "Uranus",
    description: "An ice giant that rotates on its side",
    diameter: "50,724 km",
    distance: "2.87 billion km from Sun",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    moons: "27+ known moons",
    facts: "Uranus appears blue-green due to methane in its atmosphere",
  },
  Neptune: {
    name: "Neptune",
    description: "The windiest planet with supersonic storms",
    diameter: "49,244 km",
    distance: "4.50 billion km from Sun",
    dayLength: "16 hours",
    yearLength: "165 Earth years",
    moons: "14+ known moons",
    facts: "Neptune has the fastest winds in the solar system",
  },
};

export default function SolarSystem() {
  const containerRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const planetMeshesRef = useRef([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/planet",{ state: selectedPlanet })
  }

//   setTimeout(() => {
//   console.log("5 seconds have passed!");
//   setIsLoading(false);
// }, 5000);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
  
        // Scene, camera, renderer
        const scene = new THREE.Scene();
        //sceneRef.current = scene;
        
        // Add realistic space background with planets, nebulae, and varied celestial objects
            scene.background = new THREE.Color(0x000000);

        // 1. Background Stars (10,000 stars with varying sizes)
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 8000;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        
        for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // Random position in a large sphere
        const radius = 500 + Math.random() * 500;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radius * Math.cos(phi);
        
        // Realistic star colors and sizes
        const brightness = 0.5 + Math.random() * 0.5;
        const temp = Math.random();
        if (temp < 0.1) {
            // Red giants
            starColors[i3] = 1;
            starColors[i3 + 1] = 0.3 + Math.random() * 0.3;
            starColors[i3 + 2] = 0.1;
            starSizes[i] = 2.2 + Math.random() * 2;
        } else if (temp < 0.3) {
            // Orange stars
            starColors[i3] = 1;
            starColors[i3 + 1] = 0.6 + Math.random() * 0.2;
            starColors[i3 + 2] = 0.2;
            starSizes[i] = 1.4 + Math.random() * 1;
        } else if (temp < 0.6) {
            // Yellow stars
            starColors[i3] = 1;
            starColors[i3 + 1] = 0.9 + Math.random() * 0.1;
            starColors[i3 + 2] = 0.7 + Math.random() * 0.2;
            starSizes[i] = 1.2 + Math.random() * 1;
        } else if (temp < 0.85) {
            // White stars
            starColors[i3] = 0.9 + Math.random() * 0.1;
            starColors[i3 + 1] = 0.9 + Math.random() * 0.1;
            starColors[i3 + 2] = 1;
            starSizes[i] = 1 + Math.random() * 1.2;
        } else {
            // Blue giants
            starColors[i3] = 0.6 + Math.random() * 0.2;
            starColors[i3 + 1] = 0.7 + Math.random() * 0.2;
            starColors[i3 + 2] = 1;
            starSizes[i] = 1.7 + Math.random() * 1.5;
        }
        
        // Some dim stars
        if (Math.random() < 0.4) {
            starColors[i3] *= 0.4 + Math.random() * 0.3;
            starColors[i3 + 1] *= 0.4 + Math.random() * 0.3;
            starColors[i3 + 2] *= 0.4 + Math.random() * 0.3;
            starSizes[i] *= 0.7;
        }
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
        
        const starMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
        });
        
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);
        
        // 2. Distant Galaxies (small spiral shapes)
       
        // Random position for galaxy
       
        
        // 5. Shooting Stars / Comets
        const cometTrails = [];
        for (let c = 0; c < 2; c++) {
        const cometGeo = new THREE.BufferGeometry();
        const trailLength = 30;
        const cometPos = new Float32Array(trailLength * 3);
        const cometCol = new Float32Array(trailLength * 3);
        
        const startX = (Math.random() - 0.5) * 1000;
        const startY = (Math.random() - 0.5) * 1000;
        const startZ = (Math.random() - 0.5) * 1000;
        
        for (let i = 0; i < trailLength; i++) {
            cometPos[i * 3] = startX + i * 5;
            cometPos[i * 3 + 1] = startY - i * 2;
            cometPos[i * 3 + 2] = startZ + i * 3;
            
            const fade = 1 - (i / trailLength);
            cometCol[i * 3] = 0.9 * fade;
            cometCol[i * 3 + 1] = 0.95 * fade;
            cometCol[i * 3 + 2] = 1 * fade;
        }
        
        cometGeo.setAttribute('position', new THREE.BufferAttribute(cometPos, 3));
        cometGeo.setAttribute('color', new THREE.BufferAttribute(cometCol, 3));
        
        const cometMat = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        
        const comet = new THREE.Points(cometGeo, cometMat);
        scene.add(comet);
        cometTrails.push({ mesh: comet, speed: 0.5 + Math.random() * 1 });
        }
        
        const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        2000
        );
        camera.position.set(0, 100, 200);
        //cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 120;
    controls.maxDistance = 350;

    const sunLight = new THREE.PointLight(0xffffff, 500, 0, 1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x404040));

    const loader = new THREE.TextureLoader();
    const textures = {
      Mercury: loader.load("/textures/mercury.jpg"),
      Venus: loader.load("/textures/venus.jpg"),
      Earth: loader.load("/textures/earth.jpg"),
      Mars: loader.load("/textures/mars.jpg"),
      Jupiter: loader.load("/textures/jupiter.jpg"),
      Saturn: loader.load("/textures/saturn.jpg"),
      SaturnRing: loader.load("/textures/saturn_ring.jpg"),
      Uranus: loader.load("/textures/uranus.jpg"),
      Neptune: loader.load("/textures/neptune.jpg"),
      Sun: loader.load("/textures/sun.jpg"),
    };

    // Sun
    const sunGeo = new THREE.SphereGeometry(10, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ map: textures.Sun });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Planet definitions
    const planets = [
      { name: "Mercury", radius: 1, distance: 15, speed: 0.02 },
      { name: "Venus", radius: 2, distance: 22, speed: 0.013 },
      { name: "Earth", radius: 2.2, distance: 30, speed: 0.009 },
      { name: "Mars", radius: 1.5, distance: 38, speed: 0.006 },
      { name: "Jupiter", radius: 5, distance: 50, speed: 0.002 },
      { name: "Saturn", radius: 4.5, distance: 65, speed: 0.001 },
      { name: "Uranus", radius: 3.5, distance: 80, speed: 0.0009 },
      { name: "Neptune", radius: 3.5, distance: 95, speed: 0.001 },
    ];

    const planetMeshes = [];

    planets.forEach((p) => {
      // Saturn special case
      if (p.name === "Saturn") {
        const saturnGroup = new THREE.Group();
        scene.add(saturnGroup);

        const geo = new THREE.SphereGeometry(p.radius, 64,64);
        const mat = new THREE.MeshStandardMaterial({ map: textures.Saturn, });
        const saturnMesh = new THREE.Mesh(geo, mat);
        saturnMesh.userData = { planetName: p.name };
        saturnGroup.add(saturnMesh);

        const ringGeo = new THREE.RingGeometry(
          p.radius + 0.8,
          p.radius + 6.0,
          128
        );
        const ringMat = new THREE.MeshBasicMaterial({
          map: textures.SaturnRing,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(0, 0, 0); 
        ring.rotation.x = Math.PI / 2.8;
        saturnGroup.add(ring);

        // Orbit ring (around Sun)
        const orbitGeo = new THREE.RingGeometry(
          p.distance - 0.05,
          p.distance + 0.05,
          64
        );
        const orbitMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const orbit = new THREE.Mesh(orbitGeo, orbitMat);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);

        planetMeshes.push({
          group: saturnGroup,
          mesh: saturnMesh,
          distance: p.distance,
          speed: p.speed,
          angle: Math.random() * Math.PI * 2,
        });
      } else {
        const geo = new THREE.SphereGeometry(p.radius, 32, 32);
        const mat = new THREE.MeshStandardMaterial({ map: textures[p.name] });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.x = p.distance;
        mesh.userData = { planetName: p.name };
        scene.add(mesh);

        const ringGeo = new THREE.RingGeometry(
          p.distance - 0.05,
          p.distance + 0.05,
          64
        );
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const orbitRing = new THREE.Mesh(ringGeo, ringMat);
        orbitRing.rotation.x = Math.PI / 2;
        scene.add(orbitRing);

        planetMeshes.push({
          mesh,
          distance: p.distance,
          speed: p.speed,
          angle: Math.random() * Math.PI * 2,
        });
      }
    });

    planetMeshesRef.current = planetMeshes;

    // Click detection
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        planetMeshes.map((p) => p.mesh)
      );

      if (intersects.length > 0) {
        setSelectedPlanet(intersects[0].object.userData.planetName);
      }
    };

    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.style.cursor = "pointer";

    // Animation Loop
    const animate = () => {
      planetMeshes.forEach((p) => {
        p.angle += p.speed;

        const x = p.distance * Math.cos(p.angle);
        const z = p.distance * Math.sin(p.angle);

        if (p.group) {
          p.group.position.set(x, 0, z);
        } else {
          p.mesh.position.set(x, 0, z);
        }

        // Spin rotation
        p.mesh.rotation.y += 0.01;
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

        return () => {
        renderer.domElement.removeEventListener("click", handleClick);
        controls.dispose();
        renderer.dispose();
        window.removeEventListener("resize", handleResize);
        //window.removeEventListener("wheel", wheelHandler); // Add this line
        if (container) container.removeChild(renderer.domElement);
        };
    }, []);
    //   if(isLoading){
    //     return <Loader/>
    //   }
    return (
    <div style={{ display: "flex", width: "100vw", minHeight: "100vh", overflow: "hidden", position: "relative" }}>
        {/* Info Panel */}
        <h1
        style={{
          position: "absolute",
          top: "30px",
          left: selectedPlanet ? "50%" : "50px",
          transform: selectedPlanet ? "translateX(50%)" : "translateX(0)",
          fontSize: "3em",
          fontWeight: "bold",
          background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: 0,
          zIndex: 20,
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }}
      >
        NASAverse
      </h1>
        <div
            style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "400px",
            backgroundColor: "#1a1a2e",
            borderRight: "2px solid #4a4a6a",
            boxShadow: "5px 0 15px rgba(0,0,0,0.5)",
            transform: selectedPlanet ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.5s ease",
           
            padding: "30px",
            color: "white",
            overflowY: "auto",
            zIndex: 10,
            }}
        >
            {selectedPlanet && (
            <>
                {/* Close Button (top-right) */}
                <button
                onClick={() => setSelectedPlanet(null)}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5em",
                    color: "white",
                    cursor: "pointer",
                }}
                >
                ✕
                </button>

            <h2
              style={{
                fontSize: "2em",
                marginTop: 0,
                marginBottom: "10px",
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {planetData[selectedPlanet].name}
            </h2>

            <p
              style={{
                fontSize: "1em",
                color: "#b0b0d0",
                marginBottom: "25px",
                fontStyle: "italic",
              }}
            >
              {planetData[selectedPlanet].description}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div>
                <strong style={{ color: "#8b8baa" }}>Diameter:</strong>
                <p>{planetData[selectedPlanet].diameter}</p>
              </div>
              <div>
                <strong style={{ color: "#8b8baa" }}>Distance:</strong>
                <p>{planetData[selectedPlanet].distance}</p>
              </div>
              <div>
                <strong style={{ color: "#8b8baa" }}>Day Length:</strong>
                <p>{planetData[selectedPlanet].dayLength}</p>
              </div>
              <div>
                <strong style={{ color: "#8b8baa" }}>Year Length:</strong>
                <p>{planetData[selectedPlanet].yearLength}</p>
              </div>
              <div>
                <strong style={{ color: "#8b8baa" }}>Moons:</strong>
                <p>{planetData[selectedPlanet].moons}</p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#2a2a4a",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <strong style={{ color: "#8b8baa" }}>Fun Fact:</strong>
              <p>{planetData[selectedPlanet].facts}</p>
            </div>

            <button
              onClick={handleNavigate}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1em",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#764ba2")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#667eea")
              }
            >
              Know More
            </button>
          </>
        )}
      </div>

      {/* 3D Scene */}
      <div ref={containerRef} style={{ flex: 1 }} />
    </div>
  );
}
