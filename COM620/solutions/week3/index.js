// COM620 Week 3 partial solution
// Also with mouse events and strafe from week 2 

const canvas = document.getElementById("canvas1");

const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();

const cube = new THREE.BoxGeometry(1,1,1);
const redMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(cube, redMaterial);
mesh.position.set(0, 0.5, -10);
scene.add(mesh);

const cylinder = new THREE.CylinderGeometry(1, 1, 2);
const cone = new THREE.ConeGeometry(1, 2);
const sphere = new THREE.SphereGeometry(1);

const greenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00}), 
    blueMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff}), 
    yellowMaterial = new THREE.MeshLambertMaterial({color: 0xffff00}), 
    magentaMaterial = new THREE.MeshLambertMaterial({color: 0xff00ff}),
    phongMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, shininess: 100});

const mesh2 = new THREE.Mesh(cube, blueMaterial), 
    mesh3 = new THREE.Mesh(sphere, phongMaterial), 
    mesh4 = new THREE.Mesh(cone, yellowMaterial),     
    mesh5 = new THREE.Mesh(cylinder, magentaMaterial);

mesh2.position.set(5, 0.5, 0);
mesh3.position.set(0, 1, -5);
mesh4.position.set(-5, 0.5, 0);
mesh5.position.set(0, 0.5, 5);

scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);

mesh.castShadow = true;
mesh2.castShadow = true;
mesh3.castShadow = true;
mesh4.castShadow = true;
mesh5.castShadow = true;


const light = new THREE.AmbientLight(0xffffff, 0.2), 
      light2 = new THREE.DirectionalLight(0xffffff, 0.8), 
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

const planeGeom = new THREE.PlaneGeometry(100, 100);

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

camera.position.y = 0.1;

// The current key being pressed
let currentKey = null;

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


requestAnimationFrame(renderScene);


let lt = null;
const units_per_second = 1;

function renderScene() {
    // Move the camera according to the current key
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
