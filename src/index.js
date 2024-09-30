import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
const canvas = document.querySelector("canvas.webgl");

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');


/**
 * Object
 */
const fontLoader = new FontLoader();
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Bruce Compiler',
      {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      }
    );
    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
  }
)

/**
 * Size
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

/**
 * Update its size with the setSize()
 */
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update the camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update the renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement){
    canvas.requestFullscreen();
  }else{
    document.exitFullscreen();
  }
});

const tick = () => {
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(tick);
}

tick();