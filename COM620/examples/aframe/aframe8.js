AFRAME.registerComponent('vertical-controls', {
    init: function() {
		
		/*
        window.addEventListener('keydown', e=> {
            const curPos = this.el.getAttribute("position");
            if(e.keyCode == 81) {
                this.el.setAttribute("position", {
					x: curPos.x,
                    y: curPos.y + 0.1,
					z: curPos.z
                });
            } else if (e.keyCode == 90) {
                this.el.setAttribute("position", {
					x: curPos.x,
                    y: curPos.y - 0.1,
					z: curPos.z
                });
            }
        });
		*/
		
		
		this.velocity = 0;
        window.addEventListener('keydown', e=> {
            if(e.keyCode == 81) {
				this.velocity = 1;
            } else if (e.keyCode == 90) {
				this.velocity = -1;
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
