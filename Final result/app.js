// Variables to set up


let container; //wherein we load our scene
let camera; //from where we look to our scene
let renderer; //will render out our 3D 
let scene; //3Dscene with our model in it the camera looks at
let robot; //our model
let controls; //if controls are needed

function init() {
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();


    //Camera variables
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight; //aspect ratio like monitor
                //near clipping & far clipping: basically a range wherein you will clip your model if it is outside of the near & far side values. (think overflow: hidden)
    const near = 0.1;
    const far = 10000;

    //camera setup & position
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, -1, 1500);

    /* //WIP!!
    add controls
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', renderer);
    */

    //Light setup
    const ambient = new THREE.AmbientLight(0X404040, 1);
    scene.add(ambient); 

    //directionLight
    const light = new THREE.DirectionalLight(0xAAF9F5, 1);
    light.position.set(30, 10, 1);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


    //appendChild to create canvas within our HTML file to work our 3D model on
    container.appendChild(renderer.domElement);

    //Load up 3Dmodel

    let loader = new THREE.GLTFLoader();
    loader.load('./3D/scene.gltf', function (gltf){

        //add model to our scene
        scene.add(gltf.scene);
        robot = gltf.scene.children[0];
        //render 1 frame of model (tryout)
        //renderer.render(scene,camera);
        animate();
        //animateControl(); (work in progress)
    });


} 
//Work in progress!
/*function animateControl() {
    renderer.render(scene,camera);
    requestAnimationFrame(animateControl);
}
*/

function animate() {
    requestAnimationFrame(animate);
    robot.rotation.z += 0.005;  
    renderer.render(scene, camera);

}

init();

function windowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', windowResize);