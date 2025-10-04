

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SolarSystemLoading from "./Loader";

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
    const [isLoading, setIsLoading] = useState(true);
    
      // Simulate loading (replace this with actual load trigger later)
      useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
      }, []);
    
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
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
    for (let g = 0; g < 6; g++) {
      const galaxyGeo = new THREE.BufferGeometry();
      const galaxyCount = 100;
      const galaxyPos = new Float32Array(galaxyCount * 3);
      const galaxyCol = new Float32Array(galaxyCount * 3);
      const galaxySizes = new Float32Array(galaxyCount);
      
      // Random position for galaxy
      const gx = (Math.random() - 0.5) * 1800;
      const gy = (Math.random() - 0.5) * 1800;
      const gz = (Math.random() - 0.5) * 1800;
      
      for (let i = 0; i < galaxyCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 20;
        
        galaxyPos[i * 3] = gx + dist * Math.cos(angle);
        galaxyPos[i * 3 + 1] = gy + (Math.random() - 0.5) * 3;
        galaxyPos[i * 3 + 2] = gz + dist * Math.sin(angle);
        
        const brightness = 0.3 + Math.random() * 0.3;
        galaxyCol[i * 3] = brightness;
        galaxyCol[i * 3 + 1] = brightness * 0.9;
        galaxyCol[i * 3 + 2] = brightness * 1.1;
        
        galaxySizes[i] = 0.5 + Math.random() * 1;
      }
      
      galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
      galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyCol, 3));
      galaxyGeo.setAttribute('size', new THREE.BufferAttribute(galaxySizes, 1));
      
      const galaxyMat = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });
      
      const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
      scene.add(galaxy);
    }
    
    // 3. Colorful Nebulae Clouds
    for (let n = 0; n < 2; n++) {
      const nebulaGeo = new THREE.BufferGeometry();
      const nebulaCount = 600;
      const nebulaPos = new Float32Array(nebulaCount * 3);
      const nebulaCol = new Float32Array(nebulaCount * 3);
      const nebulaSizes = new Float32Array(nebulaCount);
      
      // Random nebula position
      const nx = (Math.random() - 0.5) * 1600;
      const ny = (Math.random() - 0.5) * 1600;
      const nz = (Math.random() - 0.5) * 1600;
      
      // Random nebula color theme
      const nebulaType = Math.random();
      let r, g, b;
      if (nebulaType < 0.33) {
        // Blue nebula
        r = 0.2; g = 0.4; b = 0.9;
      } else if (nebulaType < 0.66) {
        // Purple nebula
        r = 0.7; g = 0.2; b = 0.8;
      } else {
        // Red/Pink nebula
        r = 0.9; g = 0.3; b = 0.4;
      }
      
      for (let i = 0; i < nebulaCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 60;
        
        nebulaPos[i * 3] = nx + dist * Math.cos(angle);
        nebulaPos[i * 3 + 1] = ny + (Math.random() - 0.5) * 30;
        nebulaPos[i * 3 + 2] = nz + dist * Math.sin(angle);
        
        const variance = 0.7 + Math.random() * 0.3;
        nebulaCol[i * 3] = r * variance;
        nebulaCol[i * 3 + 1] = g * variance;
        nebulaCol[i * 3 + 2] = b * variance;
        
        nebulaSizes[i] = 8 + Math.random() * 12;
      }
      
      nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
      nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaCol, 3));
      nebulaGeo.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));
      
      const nebulaMat = new THREE.PointsMaterial({
        size: 10,
        vertexColors: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      const nebula = new THREE.Points(nebulaGeo, nebulaMat);
      scene.add(nebula);
    }
    
    // 4. Asteroid Belt Effect
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidCount = 400;
    const asteroidPos = new Float32Array(asteroidCount * 3);
    const asteroidCol = new Float32Array(asteroidCount * 3);
    const asteroidSizes = new Float32Array(asteroidCount);
    
    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 700 + Math.random() * 200;
      
      asteroidPos[i * 3] = distance * Math.cos(angle);
      asteroidPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      asteroidPos[i * 3 + 2] = distance * Math.sin(angle);
      
      const gray = 0.4 + Math.random() * 0.2;
      asteroidCol[i * 3] = gray;
      asteroidCol[i * 3 + 1] = gray * 0.9;
      asteroidCol[i * 3 + 2] = gray * 0.8;
      
      asteroidSizes[i] = 0.5 + Math.random() * 1.5;
    }
    
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
    asteroidGeo.setAttribute('color', new THREE.BufferAttribute(asteroidCol, 3));
    asteroidGeo.setAttribute('size', new THREE.BufferAttribute(asteroidSizes, 1));
    
    const asteroidMat = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });
    
    const asteroids = new THREE.Points(asteroidGeo, asteroidMat);
    scene.add(asteroids);
    
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
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const sunLight = new THREE.PointLight(0xffffff, 500, 0, 1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x404040));

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
      Sun: loader.load("/textures/sun.jpg")
    };

    // Sun with texture and glow
    const sunGeo = new THREE.SphereGeometry(10, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textures.Sun,
      emissive: 0xffcc33,
      emissiveIntensity: 0.8,
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Optional: soft glow sprite
    const glowTexture = loader.load("/textures/glow.png");
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xffcc66,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(50, 50, 1);
    sun.add(glowSprite);

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
      const geo = new THREE.SphereGeometry(p.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({ map: textures[p.name] });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = p.distance;
      mesh.userData = { planetName: p.name };
      scene.add(mesh);

      const ringGeo = new THREE.RingGeometry(p.distance - 0.05, p.distance + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      planetMeshes.push({
        mesh,
        distance: p.distance,
        speed: p.speed,
        angle: Math.random() * Math.PI * 2,
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
        planetMeshes.map((p) => p.mesh)
      );

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object.userData.planetName;
        setSelectedPlanet(clickedPlanet);
      }
    };

    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.style.cursor = "pointer";

    // Animate
    const animate = () => {
  planetMeshes.forEach((p) => {
    p.angle += p.speed;
    p.mesh.position.x = p.distance * Math.cos(p.angle);
    p.mesh.position.z = p.distance * Math.sin(p.angle);
  });

  // === Background Motion ===
  // Rotate the entire background group for movement illusion
  scene.children.forEach((child, index) => {
    if (child instanceof THREE.Points) {
      // Different speeds for each layer
      if (index === 1) {
        // Main stars: very slow parallax rotation
        child.rotation.y += 0.00008;
        child.rotation.x += 0.00004;
      } else if (index > 1 && index <= 9) {
        // Galaxies: drift and rotation
        child.rotation.z += 0.00015;
        child.rotation.y += 0.00005;
      } else if (index > 9 && index <= 14) {
        // Nebulae: gentle swirling motion
        child.rotation.y += 0.0001;
        child.rotation.x += 0.00005;
      } else {
        // Asteroids and comets drift slightly
        child.rotation.z += 0.0002;
      }
    }
  });

  // === Subtle camera drift ===
  camera.position.x += Math.sin(Date.now() * 0.0001) * 0.01;
  camera.position.y += Math.cos(Date.now() * 0.0001) * 0.01;
  camera.lookAt(0, 0, 0);

  // === Animate comets ===
  scene.children.forEach((child) => {
    if (child instanceof THREE.Points && child.geometry.attributes.position.count < 50) {
      const positions = child.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.5;
        positions[i + 1] -= 0.2;

        if (positions[i] > 1000) {
          positions[i] = -1000;
          positions[i + 1] = (Math.random() - 0.5) * 1000;
        }
      }
      child.geometry.attributes.position.needsUpdate = true;
    }
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
      if (container) container.removeChild(renderer.domElement);
    };
  }, []);
//   if(isLoading){
//     return <SolarSystemLoading/>
//   }
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Info Panel */}
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
          display: "flex",
          flexDirection: "column",
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

            <p style={{ fontSize: "1em", color: "#b0b0d0", marginBottom: "25px", fontStyle: "italic" }}>
              {planetData[selectedPlanet].description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div><strong style={{ color: "#8b8baa" }}>Diameter:</strong><p>{planetData[selectedPlanet].diameter}</p></div>
              <div><strong style={{ color: "#8b8baa" }}>Distance:</strong><p>{planetData[selectedPlanet].distance}</p></div>
              <div><strong style={{ color: "#8b8baa" }}>Day Length:</strong><p>{planetData[selectedPlanet].dayLength}</p></div>
              <div><strong style={{ color: "#8b8baa" }}>Year Length:</strong><p>{planetData[selectedPlanet].yearLength}</p></div>
              <div><strong style={{ color: "#8b8baa" }}>Moons:</strong><p>{planetData[selectedPlanet].moons}</p></div>
            </div>

            <div style={{ backgroundColor: "#2a2a4a", padding: "12px", borderRadius: "10px", marginBottom: "15px" }}>
              <strong style={{ color: "#8b8baa" }}>Fun Fact:</strong>
              <p>{planetData[selectedPlanet].facts}</p>
            </div>

            {/* Know More Button */}
            <button
              onClick={() => alert("Know More clicked (add navigation here)")}
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
                marginTop: "auto",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#764ba2")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#667eea")}
            >
              Know More
            </button>
          </>
        )}
      </div>

    {/* 3D solar system canvas */}
    <div
      ref={containerRef}
      style={{
        flex: 1,
        transition: "transform 0.5s ease",                       
        transform: selectedPlanet ? "translateX(200px)" : "translateX(0)"  
      }}
    />
  </div>
);}