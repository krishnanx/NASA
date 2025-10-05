export function initSolarSystem(containerRef, sceneRef, cameraRef, planetMeshesRef, raycasterRef, mouseRef) {
  const container = containerRef.current;
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const planetMeshes = [];
  const loader = new THREE.TextureLoader();

  // Sun
  const sunGeo = new THREE.SphereGeometry(10, 64, 64);
  const sunMat = new THREE.MeshBasicMaterial({
    map: loader.load("/textures/sun.jpg"),
    emissive: 0xffcc33,
    emissiveIntensity: 0.8,
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);

  // Planets
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

  planets.forEach((p) => {
    const geo = new THREE.SphereGeometry(p.radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ map: loader.load(`/textures/${p.name.toLowerCase()}.jpg`) });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = p.distance;
    mesh.userData = { planetName: p.name };
    scene.add(mesh);

    planetMeshes.push({
      mesh,
      distance: p.distance,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2,
    });
  });

  planetMeshesRef.current = planetMeshes;

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

  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", handleResize);

  return { scene, camera, planetMeshes };
}
