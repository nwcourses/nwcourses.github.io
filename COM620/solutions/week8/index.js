import '@ar-js-org/ar.js';
import 'aframe-look-at-component';
import 'aframe-osm-3d';

AFRAME.registerComponent('peakfinder', {

    init: function() {

        this.camera = document.querySelector('a-camera');

        // Handle a GPS update ...
        window.addEventListener('gps-camera-update-position', e => {
            console.log(`pos ${e.detail.position.latitude} ${e.detail.position.longitude}`);
            // Set the 'lat' and 'lon' attributes of the 'terrarium-dem'
            // component to our current latitude and longitude. This will
            // trigger a chain reaction of downloading first the DEM data, and
            // then the OSM data
            console.log('Calling terrarium dem..');
            this.el.setAttribute('terrarium-dem', {
                lat: e.detail.position.latitude,
                lon: e.detail.position.longitude 
            })
        });

        // This event will fire when the elevation of our current location is available from the DEM.
        this.el.addEventListener('elevation-available', e => {
            console.log(`Got ele: ${e.detail.elevation}`);
            this.camera.object3D.position.y = e.detail.elevation + 1.6;
        });

        // This event will fire when the OSM data has been downloaded.
        this.el.addEventListener('osm-data-loaded', e => {
            // e.detail.pois contains GeoJSON data, as for last week.
            // Filter the result to select only peaks.
            e.detail.pois
                .filter ( poi => poi.properties.natural == 'peak')
                .forEach ( peak => {

                    // Create entities for the text and cone, and also a
                    // compound entity which will contain the text and cone.
                    // It is the compound entity which will be positioned in
                    // the world.
                    const textEntity = document.createElement('a-text');
                    const coneEntity = document.createElement('a-cone');
                    const compoundEntity = document.createElement('a-entity');
                    
                    // set the elevation of the entity. This will be contained
                    // within the GeoJSON geometry's 'coordinates' array, as the
                    // third member. Units are in metres.
                    // To do this set the y of the element's position to this
                    // value from the GeoJSON.

                    compoundEntity.setAttribute('position', {    
                        x: 0,
                        y: peak.geometry.coordinates[2],
                        z: 0
                    });

                    // set the lat and lon of the compound entity by setting
                    // its gps-projected-entity place component
                    compoundEntity.setAttribute('gps-projected-entity-place', {
                        latitude: peak.geometry.coordinates[1],
                        longitude: peak.geometry.coordinates[0]
                    });

                    // Set the properties of the cone
                    coneEntity.setAttribute('radius-bottom', 100);
                    coneEntity.setAttribute('height', 300);
                    coneEntity.setAttribute('material', {
                        color: 'magenta'
                    });
            
                    // Set the position of the cone relative to its parent
                    // (the compound entity)
                    coneEntity.setAttribute('position', {
                        x: 0,
                        y: 300,
                        z: 0
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

                    // Add the text and cone to the compound entity
                    compoundEntity.appendChild(textEntity);
                    compoundEntity.appendChild(coneEntity);
                    
                    // Add the compound entity to the scene
                    this.el.sceneEl.appendChild(compoundEntity);
            });
        });
    }
});
