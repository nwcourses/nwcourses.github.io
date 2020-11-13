// Handle the user clicking the chat button
document.getElementById('chat').addEventListener('click', e=> {
    // Create a paragraph for the message
    const msg = document.createElement('p');

    // Get the message text and add it to the paragraph
    const msgText = document.createTextNode(document.getElementById('input').value);
    msg.appendChild(msgText);
    msg.appendChild(document.createElement("br"));

    // Create a delete button
    const btn = document.createElement('input');
    btn.type='button';
    btn.value='Delete';
    // Add a click event to the delete button, so that the message is
    // removed from the div if it's clicked
    btn.addEventListener('click', e=> {
        document.getElementById('div').removeChild(msg);
    });
    // append the button to the paragraph
    msg.appendChild(btn);

    // append the paragraph to the div
    document.getElementById('div').appendChild(msg);
});
