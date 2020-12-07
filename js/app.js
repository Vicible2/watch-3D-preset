let container;
let camera;
let renderer;
let scene;
let robot;


function init() {

container = document.querySelector('.scene');

scene = new THREE.Scene();


//Camera variables
const fov = 35;
const aspect = container.clientWidth / container.clientHeight;

const near = 0.01;
const far = 10000;

//camera setup

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, -1, 1500);

//Renderer 

renderer = new THREE.WebGLRender({antialias:true, alpha:true});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

//Loading our model for the first time

let loader = new THREE.GLTFLoader();
loader.load('./3D/scene.gltf', function (gltf){

    scene.add(gltf.scene);
    renderer.render(scene,camera);
})
}

init();