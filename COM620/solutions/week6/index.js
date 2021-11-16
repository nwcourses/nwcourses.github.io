// Week 6 Partial solutions

import 'aframe';


// Dynamic content generator component
AFRAME.registerComponent('dynamic-content', {
    init: function() {
        // Create sphere, cone and cylinder using DOM
        const sphere = document.createElement('a-sphere');
        sphere.setAttribute('position', {
            x: 0,
            y: 1,
            z: -5
        });
        sphere.setAttribute('material', {
            color: 'green'
        });
        sphere.setAttribute('radius', 1);

        const cone = document.createElement('a-cone');
        cone.setAttribute('position', {
            x: -5,
            y: 1,
            z: 0
        });
        cone.setAttribute('material', {
            color: 'yellow'
        });
        cone.setAttribute('radius', 1);
        cone.setAttribute('height', 2);


        const cylinder = document.createElement('a-cylinder');
        cylinder.setAttribute('position', {
            x: 0,
            y: 1,
            z: 5
        });
        cylinder.setAttribute('material', {
            color: 'magenta'
        });
        cylinder.setAttribute('radius-bottom', 1);
        cylinder.setAttribute('radius-top', 1);
        cylinder.setAttribute('height', 1);

        this.el.sceneEl.appendChild(sphere);
        this.el.sceneEl.appendChild(cone);
        this.el.sceneEl.appendChild(cylinder);
    
    
        // Create boxes as Three.js meshes
        const boxGeom = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial1 = new THREE.MeshLambertMaterial({color: 0xff0000});
        const boxMesh1 = new THREE.Mesh(boxGeom, boxMaterial1);
        boxMesh1.position.set(0, 1, -10);
        const boxMaterial2 = new THREE.MeshLambertMaterial({color: 0x0000ff});
        const boxMesh2 = new THREE.Mesh(boxGeom, boxMaterial2);
        boxMesh2.position.set(5, 1, 0);

        // Now create two a-entities and associate each with the two meshes
        const box1 = document.createElement('a-entity');
        box1.setObject3D("mesh", boxMesh1);
        const box2 = document.createElement('a-entity');
        box2.setObject3D("mesh", boxMesh2);

        this.el.sceneEl.appendChild(box1);
        this.el.sceneEl.appendChild(box2);
    }
});

// Hexagon geometry
AFRAME.registerGeometry('hexagon', {
    init: function() {
        const hexagon = new THREE.Shape([
            new THREE.Vector2(-1, -1),
            new THREE.Vector2(1, -1),
            new THREE.Vector2(2, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(-1, 1),
            new THREE.Vector2(-2, 0),
        ]);
        hexagon.autoClose = true;    
        this.geometry = new THREE.ShapeGeometry(hexagon);
    }
});

// Vertical controls (as before)
AFRAME.registerComponent('vertical-controls', {
    schema: {
        baseVelocity: {
            type: 'number',
            default: 1
        },
        // Pass in keys to use as an array property
        keys: {
            type: 'array',
            default: ['KeyQ', 'KeyZ']
        }
    }, 
    init: function() {
        this.velocity = 0;
        window.addEventListener('keydown', e=> {
            switch(e.code) {
                case this.data.keys[0]:
                    this.velocity = 1;
                    break;

                case this.data.keys[1]:
                    this.velocity = -1;
                    break;
            }
        });
        window.addEventListener('keyup', e=> {
            if(e.code == this.data.keys[0] || e.code == this.data.keys[1]) {
                this.velocity = 0;
            }
        });
    },
    tick: function(totalTime, timeSinceLastTick) {
        const pos = this.el.getAttribute('position');
        this.el.setAttribute('position', {
            x: pos.x,
            y: pos.y + this.velocity * this.data.baseVelocity * timeSinceLastTick * 0.001,
            z: pos.z
        });
    }
});
