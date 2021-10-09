import * as THREE from './build/three.module.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';
// import { ObjectLoader } from './three.js-master/src/loaders/ObjectLoader.js';
// import { 3DMLoader } from './three.js-master/examples/jsm/loaders/3DMLoader.js';
// import { GLTFLoader } from './GLTFLoader.js';
// import { rhino3dm } from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js';

//Orbit conroller
import { OrbitControls } from './ThreeOrbitControlsGizmo-master/OrbitControls.js';
import { OrbitControlsGizmo } from './ThreeOrbitControlsGizmo-master/OrbitControlsGizmo.js';

const loader = new GLTFLoader();
// const loader3dm = new Rhino3dmLoader();
// const rhino3dm = require('rhino3dm');

let camera, scene, renderer, hemiLight;
let geometry, material, mesh, texture;

function init() {
	camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		0.001,
		100
	);
	camera.position.z = 10;
	camera.position.x = 10;
	camera.position.y = 10;

	scene = new THREE.Scene();

	// geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	// material = new THREE.MeshNormalMaterial();

	// texture = new THREE.TextureLoader().load(
	// 	'./junk-yard-robot-boy/textures/Arms_baseColor.png'
	// );
	// material = new THREE.MeshBasicMaterial({ map: texture });
	// mesh = new THREE.Mesh(geometry, material);
	// scene.add(mesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.background = new THREE.Color('black');

	document.body.appendChild(renderer.domElement);

	//model is importing here
	loader.load(
		'./pony_cartoon/scene.gltf',
		function (gltf) {
			scene.add(gltf.scene);
		},
		undefined,
		function (error) {
			console.error(error);
		}
	);

	//RHinomodel is importing here
	// loader3dm.load(
	// 	'./rhinoModel.3dm',
	// 	function (gltf) {
	// 		scene.add(gltf.scene);
	// 	},
	// 	undefined,
	// 	function (error) {
	// 		console.error(error);
	// 	}
	// );

	//hemilight
	hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 10);
	scene.add(hemiLight);

	//Ambient Light
	// const light = new THREE.AmbientLight('white'); // soft white light
	// scene.add(light);

	// Add the Orbit Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Add the Obit Controls Gizmo
	const controlsGizmo = new OrbitControlsGizmo(controls, {
		size: 100,
		padding: 8,
	});

	// Add the Gizmo domElement to the dom
	document.body.appendChild(controlsGizmo.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	mesh.rotation.z += 0.02;
	mesh.rotation.x += 0.02;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
