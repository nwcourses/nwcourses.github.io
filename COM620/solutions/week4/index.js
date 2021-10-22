// COM620 Week 4

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const canvas = document.getElementById("canvas1");

let shiba, cow, alive=true, currentKey = null, initX = 0, light, light2, light3;

const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();


setupCompoundMesh();
setupLights();
setupGround();
loadModels();
setupEvents();

let lt;
let unitsPerSecond = 1;
requestAnimationFrame(renderScene);

function setupCompoundMesh() {
    // Set up meshes
    const box = new THREE.BoxGeometry(5,5,5);
    const redMtl = new THREE.MeshLambertMaterial({color: 0xff0000});
    const largeMesh = new THREE.Mesh(box, redMtl);
    const smallBox = new THREE.BoxGeometry(); // default = 1,1,1
    const greenMtl = new THREE.MeshLambertMaterial({color: 0x00ff00});
    const blueMtl = new THREE.MeshLambertMaterial({color: 0x0000ff});
    const smallMesh1 = new THREE.Mesh(smallBox, greenMtl);
    const smallMesh2 = new THREE.Mesh(smallBox, blueMtl);

    // add the large mesh to the scene
    scene.add(largeMesh); 

    // position it in the world
    // Remember the position is the CENTRE of the cube, so this will place
    // the cube on the ground as the centre has y=2.5 and the height is 5
    largeMesh.position.set(0, 2.5, -10); 

    // add the small mesh as a child of the large mesh
    largeMesh.add(smallMesh1); 

    // position is relative to its parent (the large mesh)
    smallMesh1.position.set(-2, 3, 0); 

    // add the second small mesh as a child of the large mesh
    largeMesh.add(smallMesh2); 

    // position is relative to its parent (the large mesh);
    smallMesh2.position.set(2, 3, 0); 

    // rotate large mesh, small meshes will rotate with it
    largeMesh.rotation.y = THREE.Math.degToRad(45); 

    box.castShadow = true;
}

function setupLights() {
    light = new THREE.AmbientLight(0xffffff, 0.2); 
    light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light3 = new THREE.SpotLight(0xffffff, 0.8);

    scene.add(light);
    scene.add(light2);
    scene.add(light3);

    light2.castShadow = true;
    light3.castShadow = true;

    light2.position.y = 100;
    light3.position.set(10, 10, -10);
    light3.target.position.set(0, 0, -5);
    scene.add(light3.target);
}

function setupGround() {
    const planeGeom = new THREE.PlaneGeometry(120, 120);

    const loader = new THREE.TextureLoader();
        loader.load('texture128.png', texture => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(64, 64);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        const planeMtl = new THREE.MeshLambertMaterial({map: texture});
        const planeMesh = new THREE.Mesh(planeGeom, planeMtl);
        planeMesh.rotation.x = -0.5 * Math.PI;
        planeMesh.position.z = -5;
        scene.add(planeMesh);
        planeMesh.receiveShadow = true;
    });
}

// Note - models not provided, you need to download them yourself.
function loadModels() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("models/shiba/scene.gltf", gltf => {
        shiba = gltf.scene;
        shiba.position.z = -5;
        shiba.position.y = 1;
        scene.add(shiba);
    });
    gltfLoader.load("models/cow/scene.gltf", gltf => {
        cow = gltf.scene;
        cow.position.set(20, 0, 20);
        cow.scale.set(0.1, 0.1, 0.1);
        scene.add(cow);
    });
}

function setupEvents() {
    camera.position.y = 0.1;

    // handle the user pressing a key down
    canvas.addEventListener("keydown", e=> {
        // Does the string e.code start with 'Digit'?
        // substr() gives the substring of a string, from one index up to, but not
        // including, another index - so it will be from index 0 to 4 here
        if(e.code.substr(0, 5) == 'Digit') {
            // If so, get the actual digit, which will be at index 5 in the string
            switch(e.code[5]) {
                case '0':
                    scene.remove(light);
                    break;
                case '1':
                    scene.add(light);
                    break;
                case '2':
                    scene.remove(light2);
                    break;
                case '3':
                    scene.add(light2);
                    break;
                case '4':
                    scene.remove(light3);
                    break;
                case '5':
                    scene.add(light3);
                    break;
                case '6':
                    light3.position.x--; 
                    break;
                case '7':
                    light3.position.x++;
                    break;
            }
        } else {
            // e.code gives a string describing the key e.g. 'KeyW' for W, etc.
            currentKey = e.code; // e.keyCode is now deprecated!
        }
    });

    // handle the user releasing a key
    canvas.addEventListener('keyup', e=> {
        currentKey = null; // null indicates no key pressed
    });

    canvas.focus();

    let mouseIsDown = false;

    canvas.addEventListener("mousedown", e=> {
        initX = e.offsetX;
        mouseIsDown = true;
    });

    canvas.addEventListener("mousemove", e=> {
        if(mouseIsDown) { 
            rotate(e);
        }
    });

    canvas.addEventListener("mouseup",  e=> {
        rotate(e);
        mouseIsDown = false;
    });
}

function renderScene(t) {

    const elapsedTime = lt === undefined ? 0: t-lt;    
    lt = t;

    // Move the camera according to the current key
    // 'alive' is a boolean that could be used in a game, here it's always true.
    if(alive) {
        switch(currentKey) {
            case "KeyW":
                // Move camera forward
                camera.position.x -= 0.1 * Math.sin(camera.rotation.y);
                camera.position.z -= 0.1 * Math.cos(camera.rotation.y);
                break;

            case "KeyS":
                // Move camera backward
                camera.position.x += 0.1 * Math.sin(camera.rotation.y);
                camera.position.z += 0.1 * Math.cos(camera.rotation.y);
                break;

            case "KeyA":
                // Strafe left
                camera.position.x -= 0.1 * Math.cos(camera.rotation.y);
                camera.position.z += 0.1 * Math.sin(camera.rotation.y);
                break;

            case "KeyD":
                // Strafe right 
                camera.position.x += 0.1 * Math.cos(camera.rotation.y);
                camera.position.z -= 0.1 * Math.sin(camera.rotation.y);
                break;

            case "KeyQ":
                // Move camera up
                camera.position.y += 0.1;
                break;

            case "KeyZ":
                // Move camera down, as long as above 0.1
                if(camera.position.y > 0.1) {
                    camera.position.y -= 0.1;
                }
                break;
            case 'ArrowUp':
                // Move model towards positive z
                // Note that this model, and all the ones I've tried in
                // Sketchfab, face positive z by default, so I am assuming this
                // in calculating the rotation of the model
                shiba.position.z += 0.1
                shiba.rotation.y = 0; 
                break;
            case 'ArrowDown':
                // Move model towards negative z
                shiba.position.z -= 0.1;
                shiba.rotation.y = Math.PI; 
                break;
            case 'ArrowLeft':
                // Move model towards negative x
                shiba.position.x -= 0.1;
                shiba.rotation.y = -0.5 * Math.PI;
                break;
            case 'ArrowRight':
                // Move model towards positive x
                shiba.position.x += 0.1;
                shiba.rotation.y = 0.5 * Math.PI;
                break;
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);

    if(canvas.clientWidth != canvas.width || canvas.clientHeight != canvas.height) {
        const aspect = canvas.clientWidth / canvas.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    }
}

function rotate(e) {
    if(e.offsetX > initX) {
        rotateAnti();
    } else {
        rotateClock();
    }
}

function rotateAnti(){
    // rotate anticlockwise
    camera.rotation.y += THREE.Math.degToRad(5);

    // reset to zero once we get to 2*PI
    if(camera.rotation.y > Math.PI*2) {
        camera.rotation.y -= Math.PI*2;
    }
}

function rotateClock() {
    // rotate clockwise
    camera.rotation.y -= THREE.Math.degToRad(5);

    // reset to 2*PI once we get to 0
    if(camera.rotation.y < 0) {
        camera.rotation.y += Math.PI*2;
    }
}

