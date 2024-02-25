import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshObject } from "./MeshObject";

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGL1Renderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

camera.position.set(0, 3, 7);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Light
const ambientLight = new THREE.AmbientLight("white", 1);
const pointLight = new THREE.PointLight("white", 100, 100);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
pointLight.position.y = 10;
scene.add(ambientLight, pointLight);

// Mesh

const ground = new MeshObject({
  scene,
  name: "ground",
  width: 50,
  height: 0.1,
  depth: 50,
  color: "#092e66",
  y: -0.05,
  diffrenceY: "0",
});

const floor = new MeshObject({
  scene,
  name: "floor",
  width: 5,
  height: 0.4,
  depth: 5,
  diffrenceY: "0",
});

const wall1 = new MeshObject({
  scene,
  name: "wall1",
  width: 5,
  height: 3,
  depth: 0.2,
  z: -2.4,
});

const wall2 = new MeshObject({
  scene,
  name: "wall2",
  width: 0.2,
  height: 3,
  depth: 4.8,
  x: 2.4,
  z: 0.1,
});

const desk = new MeshObject({
  scene,
  loader,
  name: "desk",
  width: 1.8,
  height: 0.8,
  depth: 0.75,
  x: 1.2,
  z: -1.9,
  modelSrc: "/models/desk.glb",
});

const lamp = new MeshObject({
  scene,
  loader,
  name: "lamp",
  width: 0.5,
  height: 1.8,
  depth: 0.5,
  z: -1.7,
  modelSrc: "/models/lamp.glb",
});

const roboticVaccum = new MeshObject({
  scene,
  loader,
  name: "roboticVaccum",
  width: 0.5,
  height: 0.1,
  depth: 0.5,
  x: -1,

  modelSrc: "/models/vaccum.glb",
});

// Draw
const clock = new THREE.Clock();
function draw() {
  renderer.render(scene, camera);
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
