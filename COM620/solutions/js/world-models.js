AFRAME.registerComponent('world', {

	init: async function() {

		this.models = {
			cafe: ['#mug-realistic', 0.5],
			bar: ['#beer-bottle', 0.5],
			restaurant: ['#burger' , 0.05]
		};

		const res = await fetch('https://hikar.org/course/imm/world.php');
		const json = await res.json();
		json.forEach ( obj => {
			const entity = document.createElement('a-entity');
			const model = document.createElement('a-entity');

			model.setAttribute('obj-model', {
				obj: this.models[obj.type][0],
				mtl: `${this.models[obj.type][0]}-mtl` 
			});

			model.setAttribute('scale', {
				x: this.models[obj.type][1],
				y: this.models[obj.type][1],
				z: this.models[obj.type][1] 
			});

			const plane = document.createElement('a-plane');
			plane.setAttribute('width', 5);
			plane.setAttribute('height', 2);
			plane.setAttribute('look-at', '[camera]');
			plane.setAttribute('material', {
				color: 'red'
			});
			plane.setAttribute('position', {
				x:0,
				y:5,
				z:0
			});
						
			plane.setAttribute('text', {
				value: obj.name,
				wrapCount: 10,
				baseline: 'center'
			});

			entity.setAttribute('position', {
				x: obj.x,
				y: 0, 
				z:obj.z
			});
			entity.appendChild(model);	
			entity.appendChild(plane);	
			model.addEventListener('click', e => {
				alert(obj.name);
			});
			
			
			this.el.sceneEl.appendChild(entity);
		});
		console.log('init completed');
	}
});
