/*
 * PLEASE NOTE:
 *
 * You can use this code to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */

// Week 5 partial answer - basic map 

const map = L.map("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

const tileLayer = L.tileLayer(
		"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib }
).addTo(map);

// New York lat 40.75 lon -74
map.setView([40.75, -74], 14);

// Handle map click event

map.on("click", e => {
	// create a position using the coordinates from the map click
	const mapClickPos = [e.latlng.lat, e.latlng.lng];

	// Add a marker at that position
	L.marker(mapClickPos).addTo(map);
});

