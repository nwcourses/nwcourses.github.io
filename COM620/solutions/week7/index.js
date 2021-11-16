// Week 7 solution

import 'aframe';
import { GoogleProjection } from 'jsfreemaplib';

AFRAME.registerComponent('peak-downloader',  {

    init: function () {

        this.merc = new GoogleProjection();

        navigator.geolocation.getCurrentPosition( async(gpspos) => {

            console.log(`got gpspos: ${gpspos.coords.longitude} ${gpspos.coords.latitude}`);

            // Project the lat and lon into Web Mercator
            const [e,n] = this.merc.project(gpspos.coords.longitude, gpspos.coords.latitude);

            // Set the camera's position to the current world position
            // [camera] selects the entity with a 'camera' component, i.e.
            // the camera entity
            document.querySelector('[camera]').setAttribute('position', {
                x: e,
                y: 0,
                z: -n // negate the northing!
            });
                
            // Get the peaks
            const response = await fetch(`https://hikar.org/webapp/map/peaks?bbox=${gpspos.coords.longitude-0.05},${gpspos.coords.latitude-0.05},${gpspos.coords.longitude+0.05},${gpspos.coords.latitude+0.05}`);
            const json = await response.json();

            // Loop through the peaks
            json.features.forEach ( feature => {
                // Project each peak's lat and lon into Web Mercator
                const [e1,n1] = this.merc.project(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);

                // Create the entity
                const entity = document.createElement("a-cone");
                entity.setAttribute("position", {
                    x: e1,
                    y: 0,
                    z: -n1 // negate the northing!
                });
                entity.setAttribute('height', 300);
                entity.setAttribute('radius-bottom', 100);
                entity.setAttribute('material', {
                    color: 'red'
                });

                // Dynamically add the clicker component to the peak entity
                // and pass in the name and elevation
                entity.setAttribute("clicker", {
                    name: feature.properties.name,
                    elevation: feature.properties.ele
                });
                this.el.sceneEl.appendChild(entity);
            });

        },

          error => { 
            alert(error); 
          }
        );
    }
});


// Clicker component
AFRAME.registerComponent('clicker', {
    // Schema - allowing name and elevation to be passed in 
    schema: {
        name: {
            type: 'string',
            default: '',
        },
        elevation: {
            type: 'number',
            default: 0
        }
    },
    init: function() {
        this.el.addEventListener('click', e=> {
            alert(`${this.data.name}, elevation ${this.data.elevation} metres`);
        });
    }
});

