
console.log('script');

document.getElementById('chat').addEventListener('click', e=> {
	console.log('chat');
	const msg = document.createElement('p');
	msg.appendChild(document.createTextNode(document.getElementById('input').value));
	const btn = document.createElement('input');
	btn.type='button';
	btn.addEventListener('click', e=> {
		document.getElementById('div').removeChild(msg);
	});
	msg.appendChild(btn);
	document.getElementById('div').appendChild(msg);
});
