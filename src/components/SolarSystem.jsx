import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function SolarSystem() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 100, 200);

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
      Mercury: loader.load( "/textures/mercury.jpg"),
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
const mat = new THREE.MeshStandardMaterial({
  map: textures[p.name],
  color: 0xffffff,       // ensures texture color is applied properly
  metalness: 0,           // no metallic shine
  roughness: 1,           // fully rough to reduce reflectivity
  transparent: false      // ensures planet is fully opaque
});
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = p.distance;
      scene.add(mesh);

      // Orbit ring
      const ringGeo = new THREE.RingGeometry(p.distance - 0.05, p.distance + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      planetMeshes.push({ mesh, distance: p.distance, speed: p.speed, angle: Math.random() * Math.PI * 2 });
    });

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
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      if (container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}