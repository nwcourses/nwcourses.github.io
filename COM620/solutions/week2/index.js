// COM620 Week 2 partial solution
// Mouse events and strafe/pitch not implemented

const canvas = document.getElementById("canvas1");

const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});

const scene = new THREE.Scene();

const cube = new THREE.BoxGeometry(1,1,1);
const redMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(cube, redMaterial);
mesh.position.z = -10;
scene.add(mesh);

const cylinder = new THREE.CylinderGeometry(1, 1, 2);
const cone = new THREE.ConeGeometry(1, 2);
const sphere = new THREE.SphereGeometry(1);

const greenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00}), 
    blueMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff}), 
    yellowMaterial = new THREE.MeshBasicMaterial({color: 0xffff00}), 
    magentaMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});

const mesh2 = new THREE.Mesh(cube, blueMaterial), 
    mesh3 = new THREE.Mesh(sphere, greenMaterial), 
    mesh4 = new THREE.Mesh(cone, yellowMaterial),     
    mesh5 = new THREE.Mesh(cylinder, magentaMaterial);

mesh2.position.x = 5;
mesh3.position.z = -5;
mesh4.position.x = -5;
mesh5.position.z = 5;

scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);

// The current key being pressed
let currentKey = null;

// handle the user pressing a key down
canvas.addEventListener("keydown", e=> {
    // e.code gives a string describing the key e.g. 'KeyW' for W, etc.
    currentKey = e.code; // e.keyCode is now deprecated!
});

// handle the user releasing a key
canvas.addEventListener('keyup', e=> {
    currentKey = null; // null indicates no key pressed
});

canvas.focus();

requestAnimationFrame(renderScene);



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

        case "KeyQ":
            // Move camera up
            camera.position.y += 0.1;
            break;

        case "KeyZ":
            // Move camera down 
            camera.position.y -= 0.1;
            break;


        case "KeyX":
            // rotate anticlockwise
            camera.rotation.y += THREE.Math.degToRad(1);

            // reset to zero once we get to 2*PI
            if(camera.rotation.y > Math.PI*2) {
                camera.rotation.y -= Math.PI*2;
            }
            break;

        case "KeyC":
            // rotate clockwise
            camera.rotation.y -= THREE.Math.degToRad(1);

            // reset to 2*PI once we get to 0
            if(camera.rotation.y < 0) {
                camera.rotation.y += Math.PI*2;
            }
            break;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);

    if(canvas.clientWidth != canvas.width || canvas.clientHeight != canvas.height) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        const aspect = canvas.clientWidth / canvas.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }
}

function changePosition(dx, dy, dz) {
    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;
}
