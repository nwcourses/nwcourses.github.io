import * as THREE from 'three';

let camera, scene, renderer, curKey = 0, bearing = 0, offset = 0, mouseDown = false, canvas, rotStep = THREE.MathUtils.degToRad(2), boxPos = [ new THREE.Vector3(0, 0, -5), new THREE.Vector3(5, 0, 0), new THREE.Vector3(-5, 0, 0) ], cols = ['red', 'green', 'blue'], step=0.1;

function init() {
    camera = new THREE.PerspectiveCamera(60, 1.33, 0.001, 100);
    scene = new THREE.Scene();
    canvas = document.getElementById('canvas1');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas 
    });

    const box = new THREE.BoxGeometry();
    const materials = [
        new THREE.MeshLambertMaterial({color: 0xff0000}),
        new THREE.MeshLambertMaterial({color: 0x00ff00}),
        new THREE.MeshLambertMaterial({color: 0x0000ff})
    ];
    const meshes = materials.map ( material => new THREE.Mesh(box, material) );
    meshes.forEach ( (mesh,i) => {
        mesh.position.set(boxPos[i].x, boxPos[i].y, boxPos[i].z);
        scene.add(mesh);
    });

    const light = new THREE.AmbientLight(0xffffff, 0.6);
    const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
    light2.position.set( 0, 1, 0);

    scene.add(light);
    scene.add(light2);

    requestAnimationFrame(render);

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    displayStatus();
}


function render() {

    if(canvas.width != canvas.clientWidth && canvas.height != canvas.clientHeight) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    move();
}

function keyDownHandler(e) {
    curKey = e.keyCode;
}

function keyUpHandler(e) {
    curKey = 0;
}

function mouseDownHandler(e) {
    offset = e.offsetX;
    mouseDown = true;
}

function mouseMoveHandler(e) {
    if(!mouseDown) return;
    if(e.offsetX > offset) {
        bearing -= rotStep; 
        if(bearing < -Math.PI) {
            bearing = Math.PI; 
        }
        displayStatus();
    } else {
        bearing += rotStep;
        if(bearing > Math.PI) {
            bearing = -Math.PI; 
        }
    }
    camera.rotation.y = bearing;
    camera.updateProjectionMatrix();
    offset = e.offsetX;
    displayStatus();
}

function mouseUpHandler(e) {
    mouseDown = false;
}

function move() {
    switch(curKey) {
        case 87:
            camera.position.x -= Math.sin(bearing) * step;
            camera.position.z -= Math.cos(bearing) * step;
            displayStatus();
            break;
        case 65:
            camera.position.x -= Math.cos(bearing) * step;
            camera.position.z += Math.sin(bearing) * step;
            displayStatus();
            break;
        case 83:
            camera.position.x += Math.sin(bearing) * step;
            camera.position.z += Math.cos(bearing) * step;
            displayStatus();
            break;
        case 68:
            camera.position.x += Math.cos(bearing) * step;
            camera.position.z -= Math.sin(bearing) * step;
            displayStatus();
            break;
        case 81:
            camera.position.y += step;
            displayStatus();
            break;
        case 90:
            camera.position.y -= step;
            displayStatus();
            break;
    }
}

function displayStatus() {
    document.getElementById('position').innerHTML = `<p>Camera position (world coords): ${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}</p>`;
    let worldHtml = 'BOX WORLD COORDS: <ul>' + boxPos.map( (pos,i) => `<li>${cols[i]}: ${pos.x}, ${pos.y}, ${pos.z}</li>` ).join("") + '</ul>'
    let eyePos = [
        boxPos[0].clone().applyMatrix4(camera.matrixWorldInverse),
        boxPos[1].clone().applyMatrix4(camera.matrixWorldInverse),
        boxPos[2].clone().applyMatrix4(camera.matrixWorldInverse),
    ];

    let eyeHtml = 'BOX EYE COORDS: <ul>' + eyePos.map( (pos,i) => `<li>${cols[i]}: ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}</li>` ).join("") + '</ul>';
    document.getElementById('position').innerHTML += `<br />${worldHtml}`;
    document.getElementById('position').innerHTML += `<br />${eyeHtml}`;
}

init();


