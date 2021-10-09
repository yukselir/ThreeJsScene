import * as THREE from './build/three.module.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';

//Orbit conroller
import { TrackballControls } from '.controls/TrackballControls.js';
import { OrbitControls } from './ThreeOrbitControlsGizmo-master/OrbitControls.js';
import { OrbitControlsGizmo } from './ThreeOrbitControlsGizmo-master/OrbitControlsGizmo.js';

const loader = new Rhino3dmLoader();
let camera, scene, renderer;
// let controls, gui;

function init() {
	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		0.01,
		1000
	);
	camera.position.z = 80;
	camera.position.x = 0;
	camera.position.y = -120;
	// camera.lookAt(-100, 0, 100);

	// You need to add restricted orbit control

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.background = new THREE.Color('black');

	document.body.appendChild(renderer.domElement);

	const hemisphere = new THREE.HemisphereLight('white', 10);
	scene.add(hemisphere);

	loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/');

	loader.load(
		// resource URL
		'./rhinoModel.3dm',
		// called when the resource is loaded

		function (object) {
			scene.add(object);
			object.position.x = 30;
			object.position.y = 10;
			object.position.z = 20;
			object.rotateX(6.5);

			// object.rotateOnWorldAxis(
			// 	new THREE.Vector3(0, 0, 1),
			// 	THREE.Math.degToRad(100)
			// );

			// var center = new THREE.Vector3();
			// object.Geometry.center();
			// object.getCenter(center);
			// object.position.sub(center); // center the model
			// object.rotation.y = Math.PI / 2; // rotate the model
		},
		// called as loading progresses
		function (xhr) {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
		},
		// called when loading has errors
		function (error) {
			console.log('An error happened');
		}
	);

	// Add the Orbit Controls
	const controls = new TrackballControls(camera, renderer.domElement, scene);

	// controls.enableDamping = true;

	controls.target.set(4.5, 0, 4.5);
	// controls.enablePan = false;
	// controls.enableZoom = false;
	// controls.zoomSpeed = 1.0;
	// controls.maxPolarAngle = Math.PI / 2;
	// controls.update();

	//Add the Obit Controls Gizmo
	// const controlsGizmo = new OrbitControlsGizmo(controls, {
	// 	size: 100,
	// 	padding: 8,
	// });

	// Add the Gizmo domElement to the dom
	// document.body.appendChild(controlsGizmo.domElement);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	// controls.update();
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
