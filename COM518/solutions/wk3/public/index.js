/*
 * PLEASE NOTE:
 *
 * You can use this code to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */

// Handle button clicks on the search button
document.getElementById("ht_search").addEventListener("click", e=> {

    // Read in the artist from the form field
    const artist = document.getElementById("ht_artist").value;
    ajaxSearch(artist);
});

async function ajaxSearch(artist) {

    // Send a fetch request to the artist route on this server, passing the
    // artist as a parameter
    const ajaxResponse = await fetch(`/artist/${artist}`);

    // Parse the JSON
    const songs = await ajaxResponse.json();

    // Loop through each song in the JSON
    let html = "";
    songs.forEach( song => {
        // Format the HTML output, using the fields from the current song
        html += `${song.title} by ${song.artist}, year ${song.year}<br />`;
    });

    // Add the results to the 'ht_results' <div>
    document.getElementById("ht_results").innerHTML = html;
}


// Add a song
document.getElementById("ht_add").addEventListener("click", async() => {

    // Create an object containing the details from the form
    const song = {
        "title": document.getElementById("new_title").value,
        "artist": document.getElementById("new_artist").value,
        "year": document.getElementById("new_year").value,
        "quantity": document.getElementById("new_quantity").value,
        "price": document.getElementById("new_price").value
    };

    try {

        // Send an AJAX post request to the server, with the song in the body
        const response = await fetch('/song/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });    

        // Handle the status returned from the server
        if(response.status == 200) {
            alert("Successfully added");
        } else if (response.status == 400) {
            alert("Blank fields");
        } else {
            alert(`Unknown error: code ${response.status}`);
        }
    } catch(e) {
        alert(`Error: ${e}`);
    }
});
