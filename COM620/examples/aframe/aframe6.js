AFRAME.registerComponent("tester", {
	init: function() {
		this.el.addEventListener('click', e=> {
			alert('clicked');
			this.el.setAttribute('material', { color: 'blue'});
			this.el.setAttribute('geometry', { primitive: 'box'});
		});
	}
});
