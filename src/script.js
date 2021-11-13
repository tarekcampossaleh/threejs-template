import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

const scene = new THREE.Scene();

const canvas = document.querySelector(".webgl");


const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff00ff })
);
group.add(cube1);

// to see axes
const axesHelper = new THREE.AxesHelper();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 0;
camera.position.y = 0;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

gsap.to(group.position, { duration: 1, delay: 1, x: 2 });

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    group.rotation.y = elapsedTime * Math.PI * 0.5;

    group.position.x = Math.sin(elapsedTime);
    group.position.y = Math.cos(elapsedTime);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
