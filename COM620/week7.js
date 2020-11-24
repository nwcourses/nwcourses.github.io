navigator.geolocation.watchPosition( pos => {
    document.getElementById('position').innerHTML = `<strong>Lon: ${pos.coords.longitude.toFixed(3)} Lat: ${pos.coords.latitude.toFixed(3)}</strong>`;
    },
    e => { document.getElementById('position').innerHTML = `<strong>An error occurred: ${e}</strong>`; },
    { enableHighAccuracy: true, maximumAge: 5000 }
);
