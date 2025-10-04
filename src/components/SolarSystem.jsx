import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PlanetDetails from "./PlanetDetails";

export default function SolarSystem() {
  const containerRef = useRef();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 100, 200);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    const sunLight = new THREE.PointLight(0xffffff, 2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x333333));

    // Sun
    const sunGeo = new THREE.SphereGeometry(10, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Textures
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

    // Planets with details
    const planets = [
      {
        name: "Mercury",
        englishName: "Mercury",
        radius: 1,
        distance: 15,
        speed: 0.04,
        mass: { massValue: 3.3, massExponent: 23 },
        gravity: 3.7,
        density: 5.43,
        discoveryDate: "Prehistory",
        moons: [],
      },
      {
        name: "Venus",
        englishName: "Venus",
        radius: 2,
        distance: 22,
        speed: 0.015,
        mass: { massValue: 4.87, massExponent: 24 },
        gravity: 8.87,
        density: 5.24,
        discoveryDate: "Prehistory",
        moons: [],
      },
      {
        name: "Earth",
        englishName: "Earth",
        radius: 2.2,
        distance: 30,
        speed: 0.01,
        mass: { massValue: 5.97, massExponent: 24 },
        gravity: 9.81,
        density: 5.52,
        discoveryDate: "Prehistory",
        moons: [{ name: "Moon" }],
      },
      {
        name: "Mars",
        englishName: "Mars",
        radius: 1.5,
        distance: 38,
        speed: 0.008,
        mass: { massValue: 0.642, massExponent: 24 },
        gravity: 3.71,
        density: 3.93,
        discoveryDate: "Prehistory",
        moons: [{ name: "Phobos" }, { name: "Deimos" }],
      },
      {
        name: "Jupiter",
        englishName: "Jupiter",
        radius: 5,
        distance: 50,
        speed: 0.004,
        mass: { massValue: 1898, massExponent: 24 },
        gravity: 24.79,
        density: 1.33,
        discoveryDate: "Prehistory",
        moons: [
          { name: "Io" },
          { name: "Europa" },
          { name: "Ganymede" },
          { name: "Callisto" },
        ],
      },
      {
        name: "Saturn",
        englishName: "Saturn",
        radius: 4.5,
        distance: 65,
        speed: 0.003,
        mass: { massValue: 568, massExponent: 24 },
        gravity: 10.44,
        density: 0.687,
        discoveryDate: "Prehistory",
        moons: [{ name: "Titan" }, { name: "Rhea" }, { name: "Iapetus" }],
      },
      {
        name: "Uranus",
        englishName: "Uranus",
        radius: 3.5,
        distance: 80,
        speed: 0.002,
        mass: { massValue: 86.8, massExponent: 24 },
        gravity: 8.69,
        density: 1.27,
        discoveryDate: 1781,
        moons: [{ name: "Miranda" }, { name: "Ariel" }],
      },
      {
        name: "Neptune",
        englishName: "Neptune",
        radius: 3.5,
        distance: 95,
        speed: 0.0015,
        mass: { massValue: 102, massExponent: 24 },
        gravity: 11.15,
        density: 1.64,
        discoveryDate: 1846,
        moons: [{ name: "Triton" }, { name: "Nereid" }],
      },
    ];

    // Create meshes
    const planetMeshes = [];
    planets.forEach((p) => {
      const geo = new THREE.SphereGeometry(p.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({ map: textures[p.name] });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = p.distance;
      mesh.userData = p; // full planet details
      scene.add(mesh);

      // Orbit rings
      const ringGeo = new THREE.RingGeometry(
        p.distance - 0.05,
        p.distance + 0.05,
        64
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x888888,
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

    // Raycaster & click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;

    controls.addEventListener("start", () => (isDragging = true));
    controls.addEventListener("end", () => {
      setTimeout(() => (isDragging = false), 0);
    });

    const onPointerDown = (event) => {
      if (isDragging) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        planetMeshes.map((p) => p.mesh)
      );

      if (intersects.length > 0) {
        setSelectedPlanet(intersects[0].object.userData);
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // Animation loop
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

    return () => {
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
      <PlanetDetails data={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </>
  );
}
