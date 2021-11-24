import '@ar-js-org/ar.js';
import 'aframe-look-at-component';

AFRAME.registerComponent('peakfinder', {

    init: function() {
        // Handle a GPS update ...
        window.addEventListener('gps-camera-update-position', async(e) => {
            const resp = await fetch(`https://hikar.org/webapp/map/peaks?bbox=${e.detail.position.longitude-0.05},${e.detail.position.latitude-0.05},${e.detail.position.longitude+0.05},${e.detail.position.latitude+0.05}`);
            
            const peaks = await resp.json();

            peaks.features.forEach ( peak => {
                const textEntity = document.createElement('a-text');
                    
                // set the lat and lon of the entity by setting
                // its gps-projected-entity place component
                textEntity.setAttribute('gps-projected-entity-place', {
                    latitude: peak.geometry.coordinates[1],
                    longitude: peak.geometry.coordinates[0]
                });

                // Set the scale of the text
                textEntity.setAttribute('scale',  {
                    x: 1000,
                    y: 1000,
                    z: 1000
                });

                // Make the text look-at the camera
                textEntity.setAttribute('look-at', '[gps-projected-camera]');

    
                // Horizontally centre-align the text so the centre of the
                // text is placed at the parent entity's world position
                textEntity.setAttribute('align', 'center');
                textEntity.setAttribute('value', peak.properties.name || 'No name');

                // Add the text entity to the scene
                this.el.sceneEl.appendChild(textEntity);
            });
        });
    }
});
