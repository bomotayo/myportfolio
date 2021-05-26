import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//container that holds everything;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//Torus
//GEometry the {x,y,z} points that makeup a shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//Material the wrapping paper for an object
const material = new THREE.MeshStandardMaterial({
  color: 0xff7d33,
});

//Mesh = geometry + material
const torus = new THREE.Mesh(geometry, material);

//adding object to screen
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xfffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//created 200 randomly positioned stars
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
scene.background = spaceTexture;

// Avatar
const tundeTexture = new THREE.TextureLoader().load("tunde.jpg");

const tunde = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: tundeTexture })
);

scene.add(tunde);

//Moon mesh
const moonTexture = new THREE.TextureLoader().load("moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("normal.jpeg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({ map: moonTexture, normalMap: normalTexture })
);
scene.add(moon);

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ color: 0xff4500 })
);
scene.add(cylinder);

moon.position.setX(30);
moon.position.y = 12;

cylinder.position.y = -15;
cylinder.position.x = 30;

tunde.position.x = -35;
tunde.position.y = 16;
tunde.position.z = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cylinder.rotation.x += 0.05;
  cylinder.rotation.y += 0.075;
  cylinder.rotation.z += 0.05;

  tunde.rotation.y += 0.001;
  tunde.rotation.z += 0.001;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

//recursive loop for rerendering
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  tunde.rotation.y += 0.005;

  moon.rotation.y += 0.005;
  cylinder.rotation.y += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
