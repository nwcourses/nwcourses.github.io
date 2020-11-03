window.onload = () => {
    document.getElementById('boxmove').addEventListener('change', e=> {
        const box = document.getElementById('box1');
        const value = document.getElementById('boxmove').value;
		console.log(value);
        box1.setAttribute('position', {
            x: value,
            y: 1,
            z: -5
        });
    });
};
