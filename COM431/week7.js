function graph(nvals = 50, lineWidth = 3){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const inv = 1/nvals;
    ctx.lineWidth = lineWidth;

    drawFunction('green', i => i);
    drawFunction('red', i => i*i);
    drawFunction('blue', i => Math.log2(i));
    drawFunction('magenta', i => (i*i + i) / 2);

    function drawFunction(colour, fn, start=0, end=nvals) {
        let j;
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for(let i=start; i<end; i++) {
            j=fn(i);
            ctx.lineTo(canvas.width * inv * (i-start), canvas.height * inv * (nvals-j));
        }
        ctx.stroke();
    }
}

graph();
