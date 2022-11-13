

class Canvas {
    constructor(elemId, scale=1) {
        const canvas = document.getElementById(elemId);
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.scale = scale;
        this.clear();
    }

    clear() {
        this.ctx.fillStyle = '#ffffc0';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2, 0);
        this.ctx.lineTo(this.width/2, this.height);
        this.ctx.stroke();
        this.ctx.moveTo(0, this.height/2);
        this.ctx.lineTo(this.width, this.height/2);
        this.ctx.stroke();
    }

    convCoords(x,y) {
        return [(x+this.width/2) , (this.width/2-y) ];
    }    

    draw(coords) {
        const canvasCoords = coords.map ( coord => this.convCoords(coord[0]*this.scale, coord[1]*this.scale));
        this.ctx.beginPath();
        this.ctx.moveTo(canvasCoords[0][0], canvasCoords[0][1]);
        for(let i=1; i<canvasCoords.length; i++) {
            this.ctx.lineTo(canvasCoords[i][0], canvasCoords[i][1]);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }
}    


let canvas, mtx;

function init(){
    resetMatrix();
    displayMatrix();
    canvas = new Canvas('canvas1', 20);
    drawShape();
    document.getElementById("updateMtxBtn").addEventListener("click", e=> {
        const mtx00 = document.getElementById('mtx00').value;
        const mtx01 = document.getElementById('mtx01').value;
        const mtx10 = document.getElementById('mtx10').value;
        const mtx11 = document.getElementById('mtx11').value;
        mtx = math.multiply(mtx, [[mtx00, mtx01],[mtx10,mtx11]]);
        displayMatrix();
        drawShape();
    });

    document.getElementById("resetMtx").addEventListener("click", e=> {
        resetMatrix();
        displayMatrix();
        drawShape();
    });
}


function rad(deg) {
    return (Math.PI/180)*deg;
}

function resetMatrix(){
    mtx = [[1,0],[0,1]];
}

function displayMatrix() {
    document.getElementById('cur00').innerHTML = mtx[0][0].toFixed(1);
    document.getElementById('cur01').innerHTML = mtx[0][1].toFixed(1);
    document.getElementById('cur10').innerHTML = mtx[1][0].toFixed(1);
    document.getElementById('cur11').innerHTML = mtx[1][1].toFixed(1);
}

function drawShape() {
    canvas.clear();
    const shape = [[2,1],[6,1],[6,2],[2,2]];
    const transformedShape = shape.map (coord => math.multiply(mtx, coord));
    canvas.ctx.strokeStyle = 'red';
    canvas.ctx.strokeWidth = '2px';
    canvas.draw(transformedShape);

}
    
    
init();
