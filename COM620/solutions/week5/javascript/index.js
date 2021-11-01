// Week 5 solutions

import 'aframe';

// Greeting with schema for message and name
AFRAME.registerComponent('greeting', {
    schema: {    
        message: {
            type: 'string',
            default: 'Hello'
        },
        name: {
            type: 'string',
            default: 'Fred'
        }
    },
    init: function() {
        alert(`${this.data.message} ${this.data.name}`);
    }
});

// Clicker component
AFRAME.registerComponent('clicker', {
    init : function() {
        // add a click event to the component's parent entity
        this.el.addEventListener('click', e=> {
            // set the attribute of the component's parent entity
            this.el.setAttribute('material', {
                color: 'blue'
            });

            // change the geometry to a box. This works as any property of
            // any component can be changed
            this.el.setAttribute('geometry', {
                primitive: 'box'
            });
        });
    }
});

// Colour changer for the two boxes
AFRAME.registerComponent('colour-changer' , {
    init: function() {
        window.addEventListener('keydown', e=> {
            // Variables representing the currently selected box and the
            // other box
            this.selectedBox = null;
            this.otherBox = null;
            // Test the key code and set the variables 'selectedBox' to 
            // reference the selected box and 'otherBox' to reference the
            // other box
            switch(e.code) {    
                case "Digit1":
                    this.selectedBox = document.getElementById('box1');
                    this.otherBox = document.getElementById('box2');
                    break;
                case 'Digit2':
                    this.selectedBox = document.getElementById('box2');
                    this.otherBox = document.getElementById('box1');
                    break;
            }
            // If we have just selected a box, set its colour to green and
            // set the other box to red
            if(this.selectedBox !== null) {
                this.selectedBox.setAttribute('material', { color: 'green' } );
                this.otherBox.setAttribute('material', { color: 'red' } );

                // ADVANCED: remove the 'mover' component from the other box
                // and add it to the selected box
                // This allows the entity to move, as the 'mover' component
                // moves the entity it's attached to. See the 'mover' component
                // below.
                //
                // This is the most elegant way of doing this. An alternative,
                // easier to code (but less elegant) approach would be to 
                // attach the 'mover' component to the scene as 
                // a whole, make 'selectedBox' a global variable, and make the
                // 'mover' component move 'selectedBox' rather than its parent
                // entity.
                this.otherBox.removeAttribute('mover');
                this.selectedBox.setAttribute('mover', true);
            }
        });
    }
});

// More advanced version of vertical-controls with baseVelocity property
// representing fundamental velocity in metres per second
AFRAME.registerComponent('vertical-controls', {
    schema: {
        baseVelocity: {
            type: 'number',
            default: 1
        }
    }, 
    init: function() {
        this.velocity = 0;
        window.addEventListener('keydown', e=> {
            switch(e.code) {
                case 'KeyQ':
                    this.velocity = 1;
                    break;

                case 'KeyZ':
                    this.velocity = -1;
                    break;
            }
        });
        window.addEventListener('keyup', e=> {
            if(e.code == 'KeyQ' || e.code == 'KeyZ') {
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

////////////////////////////////// ADVANCED ////////////////////////////////////

// 'mover' component, allowing a given entity to move

AFRAME.registerComponent('mover', {
    init: function() {
        // We need to bind the key handling functions to the current object 
        // 'this' in order to preserve the context of 'this'
        // See https://nwcourses.github.io/wad/bind.html for more on this
        this.boundKeydown = this.keydown.bind(this);
        this.boundKeyup = this.keyup.bind(this);

        // Run the key event handling functions when the key events occur
        // We have to use a named function, rather than an arrow function, so
        // that we can remove the event listener later
        window.addEventListener('keydown', this.boundKeydown); 
        window.addEventListener('keyup', this.boundKeyup); 

        // Initialise x and z velocities to 0
        this.xVel = 0;
        this.zVel = 0;
    },

    // Set the x and z velocities according to the key press
    keydown: function(e) {
        switch(e.code) {
            case 'KeyI':
                this.zVel = 1;
                break;
            case 'KeyK':
                this.zVel = -1;
                break;
            case 'KeyJ':
                this.xVel = -1;
                break;
            case 'KeyL':
                this.xVel = 1;
                break;
        }
    },

    // Set velocities to 0 on key release
    keyup: function(e) {
        switch(e.code) {
            case 'KeyI':
            case 'KeyK':
                this.zVel = 0;
                break;
            case 'KeyJ':
            case 'KeyL':
                this.xVel = 0;
                break;
        }
    },

    // tick() updates current position, similar to vertical-controls component
    tick: function(totalTime, timeSinceLastTick) {
        const pos = this.el.getAttribute('position');
        this.el.setAttribute('position', {
            x: pos.x + this.xVel * 0.001 * timeSinceLastTick,
            y: pos.y,
            z: pos.z + this.zVel * 0.001 * timeSinceLastTick
        });
    },

    // The remove() lifecycle method of a component runs when that component
    // is removed from its parent entity
    remove: function() {
        // Remove the previously-attached key handler functions
        // If we do not do this, the event handlers will continue running even
        // when the component is removed from the parent entity
        window.removeEventListener('keyup', this.boundKeyup); 
        window.removeEventListener('keydown', this.boundKeydown); 
    }
});
