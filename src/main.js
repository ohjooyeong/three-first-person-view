import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGL1Renderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// Camera
const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  1000 // far
);

camera.position.set(-3, 3, 7);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 3);
directionalLight.position.set(-3, 5, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Mesh
const boxMesh = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  // new THREE.MeshBasicMaterial({ color: "firebrick" })
  new THREE.MeshLambertMaterial({ color: "firebrick", side: THREE.DoubleSide })
);
boxMesh.position.y = 1;
boxMesh.castShadow = true;

const groundMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  // new THREE.MeshBasicMaterial({ color: "#092e66" })
  new THREE.MeshLambertMaterial({ color: "#092e66", side: THREE.DoubleSide })
);
groundMesh.rotation.x = THREE.MathUtils.degToRad(-90);
groundMesh.receiveShadow = true;

scene.add(boxMesh, groundMesh);

camera.lookAt(boxMesh.position);

// Draw
const clock = new THREE.Clock();
function draw() {
  // boxMesh.position.y += 0.01;
  const delta = clock.getDelta();

  boxMesh.position.y += delta;
  if (boxMesh.position.y > 5) {
    boxMesh.position.y = 1;
  }

  renderer.render(scene, camera);
  controls.update();

  // window.requestAnimationFrame(draw);
  renderer.setAnimationLoop(draw);
}

draw();

function setLayout() {
  camera.aspect = window.innerWidth / window.innerHeight; // aspect
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Events
window.addEventListener("resize", setLayout);
