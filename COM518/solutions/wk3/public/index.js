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
        html += `${song.title} by ${song.artist}, year ${song.year}, chart ${song.chart}<br />`;
    });

    // Add the results to the 'ht_results' <div>
    document.getElementById("ht_results").innerHTML = html;
}
