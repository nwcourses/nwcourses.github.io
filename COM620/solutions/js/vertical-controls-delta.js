AFRAME.registerComponent('vertical-controls', {

    schema: {
        velocity: {
            type: 'number',
            default: 1
        }
    },

    init: function() {
        this.velocity = 0;
        window.addEventListener('keydown', e=> {
            if(e.keyCode == 81) {
                this.velocity = this.data.velocity;
            } else if (e.keyCode == 90) {
                this.velocity = -this.data.velocity;
            }
        });
        window.addEventListener('keyup', e=> {
            if(e.keyCode == 81 || e.keyCode == 90) {
                this.velocity = 0;
            }
        });
    },

    tick: function(time, delta) {
        const curPos = this.el.getAttribute("position");
        this.el.setAttribute("position", {
            x: curPos.x,
            y: curPos.y + delta * 0.001 * this.velocity,
            z: curPos.z
        });
    }
});
