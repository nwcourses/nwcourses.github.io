AFRAME.registerComponent('dynamic-content', {

    init: async function() {

        // Create a JavaScript object mapping types to colours
        const colours = {
            'bar' : 'red',
            'restaurant': 'blue',
            'cafe' : 'brown'
        };

        const res = await fetch('https://hikar.org/course/imm/world.php');
        const json = await res.json();
        json.forEach ( obj => {
            const entity = document.createElement('a-entity');

            entity.setAttribute('material', {
                color: colours[obj.type]
            });

            entity.setAttribute('geometry', {
                primitive: 'sphere'
            });
 
            entity.setAttribute('position', {
                x: obj.x,
                y: 1, 
                z:obj.z
            });

            entity.addEventListener('click', e => {
                alert(obj.name);
            });
            
            
            this.el.sceneEl.appendChild(entity);
        });
    }
});
