/*
 * PLEASE NOTE:
 *
 * You can use this code to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */

// Week 4 answer - using DOM to create a Buy button; send AJAX post request to buy route

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

    // Blank out the results div, to remove the previous search
    document.getElementById("ht_results").innerHTML = "";

    songs.forEach( song => {

        // Create a paragraph using the DOM
        const p = document.createElement("p");

        // Create a text node, containing the text to include in the paragraph
        // (the song details)
        const text = document.createTextNode(`${song.title} by ${song.artist}, year ${song.year}, chart ${song.chart}`);

        // Append the text node to the paragraph
        p.appendChild(text);

        // Create a button, allowing the user to buy the song
        const btn = document.createElement("input");
        btn.setAttribute("type", "button");
    
        // Set the text on the button
        btn.setAttribute("value", "Buy!");
            
        // Add event handler to the button, so that the song is bought when
        // we click on it
        btn.addEventListener("click", async(e) => {
            // Send an AJAX post request to the buy route, passing in the 
            // song ID as a parameter
            const ajaxResponse2 = await fetch(`/song/${song.ID}/buy`, {
                method: 'POST'
            });

            // If the HTTP code is 200, the operation was successful, if not
            // display the error sent back from the server within the JSON
            if(ajaxResponse2.status == 200) {
                alert('Song bought successfully');
            } else {
                const json = await response.json();
                alert(`Error buying song: details ${json.error}`);
            }
        });

        // Add the paragraph and button to the results div
        document.getElementById("ht_results").appendChild(p);
        document.getElementById("ht_results").appendChild(btn);
    });
}
