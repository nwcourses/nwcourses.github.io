// COM620 Week 1 solution

const canvas1 = document.getElementById("canvas1");

const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas1});

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


requestAnimationFrame(renderScene);


function renderScene() {
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
}

// Note the use of bind() to supply different dx, dy and dz arguments to changePosition() depending on which direction we're moving
document.getElementById("dx").addEventListener("click", changePosition.bind(this, -1, 0, 0));
document.getElementById("dy").addEventListener("click", changePosition.bind(this, 0, -1, 0));
document.getElementById("dz").addEventListener("click", changePosition.bind(this, 0, 0, -1));
document.getElementById("ix").addEventListener("click", changePosition.bind(this, 1, 0, 0));
document.getElementById("iy").addEventListener("click", changePosition.bind(this, 0, 1, 0));
document.getElementById("iz").addEventListener("click", changePosition.bind(this, 0, 0, 1));
document.getElementById('ra').addEventListener("click", e=> {
    camera.rotation.y += THREE.Math.degToRad(10);
});
document.getElementById('rc').addEventListener("click", e=> {
    camera.rotation.y -= THREE.Math.degToRad(10);
});

function changePosition(dx, dy, dz) {
    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;
    document.getElementById('pos').innerHTML = `X ${camera.position.x.toFixed(1)} Y ${camera.position.y.toFixed(1)} Z ${camera.position.z.toFixed(1)}`;
}
