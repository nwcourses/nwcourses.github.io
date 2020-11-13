window.onload = () => {
    document.getElementById('boxmove').addEventListener('change', e=> {
        const box = document.getElementById('box1');
        const value = document.getElementById('boxmove').value;
        box1.setAttribute('position', {
            x: value,
            y: 1,
            z: -5
        });
    });
    document.getElementById('boxrotate').addEventListener('change', e=> {
        const box = document.getElementById('box1');
        const value = document.getElementById('boxrotate').value;
        box1.setAttribute('rotation', {
            x: 0,
            y: value,
            z: 0 
        });
    });
};
