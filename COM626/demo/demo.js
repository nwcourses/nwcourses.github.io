import * as THREE from 'three';

let camera, scene, renderer, curKey = 0, bearing = 0, offset = 0, mouseDown = false, canvas, rotStep = THREE.MathUtils.degToRad(2), boxPos = [ new THREE.Vector3(0, 0.5, -5), new THREE.Vector3(5, 0.5, 0), new THREE.Vector3(-5, 0.5, 0) ], cols = ['red', 'green', 'blue'], step=0.1, canvas2;

class Canvas2 {
    constructor(canvasEl) {
        this.ctx = canvasEl.getContext('2d');
        this.ctx.fillStyle = '#c0ffc0';
        this.ctx.fillRect(0,0,canvasEl.width,canvasEl.height);
        this.drawBoxes();
    }

    drawBoxes() {
        this.drawRectXZ('red', 0, -5);
        this.drawRectXZ('green', 5, 0);
        this.drawRectXZ('blue', -5, 0);
    }

    setPosition(x,z,bearing) {
        if(this.screenX !== undefined && this.screenY !== undefined) {
            this.ctx.fillStyle = '#c0ffc0';
            this.ctx.fillRect(this.screenX-25, this.screenY-25, 50, 50);
        }
        this.screenX = x*30 + 300; 
        this.screenY = z*30 + 300;
        this.ctx.fillStyle = '#c0ffc0';
        this.ctx.fillRect(this.screenX-5, this.screenY-5, 20, 20);
        this.ctx.save();
        this.ctx.translate(this.screenX, this.screenY);
        this.ctx.rotate(-bearing);
        this.drawRect('#ff00ff', 0,0,-5,-20);
        this.ctx.restore();
        this.drawBoxes();
    }

    drawRectXZ(colour, x, z,w=10,h=10) {
        this.drawRect(colour, x*30 + 300, z*30 + 300,w,h);
    }

    drawRect(colour, screenX, screenY,w=10,h=10) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(screenX, screenY, w,h);
    }
    
}

function init() {
    camera = new THREE.PerspectiveCamera(60, 1.33, 0.001, 100);
    scene = new THREE.Scene();
    canvas = document.getElementById('canvas1');
    canvas2 = new Canvas2(document.getElementById('canvas2'));

    camera.position.y = 0.1;

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

    const planeGeom = new THREE.PlaneGeometry(100, 100);
    const planeMtl = new THREE.MeshLambertMaterial({color: 0x004000});
    const planeMesh = new THREE.Mesh(planeGeom, planeMtl);
    planeMesh.rotation.x = -Math.PI/2;
    scene.add(planeMesh);
    requestAnimationFrame(render);

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    update();
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
        update();
    } else {
        bearing += rotStep;
        if(bearing > Math.PI) {
            bearing = -Math.PI; 
        }
    }
    camera.rotation.y = bearing;
    camera.updateProjectionMatrix();
    offset = e.offsetX;
    update();
}

function mouseUpHandler(e) {
    mouseDown = false;
}

function move() {
    switch(curKey) {
        case 87:
            camera.position.x -= Math.sin(bearing) * step;
            camera.position.z -= Math.cos(bearing) * step;
            update();
            break;
        case 65:
            camera.position.x -= Math.cos(bearing) * step;
            camera.position.z += Math.sin(bearing) * step;
            update();
            break;
        case 83:
            camera.position.x += Math.sin(bearing) * step;
            camera.position.z += Math.cos(bearing) * step;
            update();
            break;
        case 68:
            camera.position.x += Math.cos(bearing) * step;
            camera.position.z -= Math.sin(bearing) * step;
            update();
            break;
        case 81:
            camera.position.y += step;
            update();
            break;
        case 90:
            if(camera.position.y >= step + 0.01) {
                camera.position.y -= step;
            }
            update();
            break;
    }
}

function update() {
    document.getElementById('position').innerHTML = `<p>Camera position (world coords): ${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}</p>`;
//    let worldHtml = 'BOX WORLD COORDS: ' + boxPos.map( (pos,i) => `>${cols[i][0]}: [${pos.x}, ${pos.y}, ${pos.z}]`).join(";  ");
    let eyePos = [
        boxPos[0].clone().applyMatrix4(camera.matrixWorldInverse),
        boxPos[1].clone().applyMatrix4(camera.matrixWorldInverse),
        boxPos[2].clone().applyMatrix4(camera.matrixWorldInverse),
    ];

    let eyeHtml = 'BOX EYE COORDS: ' + eyePos.map( (pos,i) => `<span style='color: white; font-weight: bold; background-color: ${cols[i]}'>${cols[i][0]}: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]</span>` ).join(";  "); 
//    document.getElementById('position').innerHTML += `<br />${worldHtml}`;
    document.getElementById('position').innerHTML += `<br />${eyeHtml}`;

    canvas2.setPosition(camera.position.x, camera.position.z, bearing);
}

init();

