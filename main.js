const cnv = document.getElementById('pendulumCanvas');
const ctx = cnv.getContext('2d');

let rect = cnv.getBoundingClientRect();
cnv.width = rect.width;
cnv.height = rect.height;
window.onresize = () => {
    rect = cnv.getBoundingClientRect();
    cnv.width = rect.width;
    cnv.height = rect.height;
}



let TRAIL_COUNT = 500;
let dt = 0.065;
function dft(x) {
    const X = [];
    const N = x.length;
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;
        for (let n = 0; n < N; n++) {
            const phi = (2 * Math.PI * k * n) / N;
            re += x[n] * Math.cos(phi);
            im -= x[n] * Math.sin(phi);
        }
        re = re<1e-12 && re>-1e-12 ? 0 : re/N;
        im = im<1e-12 && im>-1e-12 ? 0 : im/N;
        let freqidx = k>N/2 ? k-N : k;
        const freq = (2 * Math.PI * freqidx) / N;
        const amp = Math.sqrt(re * re + im * im);
        const phase = Math.atan2(im, re);
        X.push({ re, im, freq, amp, phase });
    }
    return X;
}

class rotatingVector {
    constructor(pivot, mag, freq, phase) {
        this.pivot = pivot;
        this.mag = mag;
        this.freq = freq;
        this.phase = phase;
        this.end = { x: pivot.x + mag * Math.cos(phase), y: pivot.y + mag * Math.sin(phase) };
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.pivot.x, this.pivot.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.pivot.x, this.pivot.y,this.mag, 0, 2* Math.PI);
        ctx.stroke()
    }
    
    update(time) {
        if(this === vectorX[vectorX.length-1]) {
            trailX.unshift((this.end.x));
            ctx.beginPath();
            ctx.moveTo(this.end.x, this.end.y);
            ctx.lineTo(this.end.x, cnv.height);
            ctx.strokeStyle = 'rgba(0,0,255,0.25)';
            ctx.stroke();
        }
        if(this === vectorY[vectorY.length-1]) {
            trailY.unshift((this.end.y));
            ctx.beginPath();
            ctx.moveTo(this.end.x, this.end.y);

            ctx.lineTo(cnv.width, this.end.y);
            ctx.strokeStyle = 'rgba(0,0,255,0.25)';
            ctx.stroke();
        }
        if(trailX.length>TRAIL_COUNT) trailX.pop();
        if(trailY.length>TRAIL_COUNT) trailY.pop();
         
        this.end.x = this.pivot.x + this.mag * Math.cos(this.phase + this.freq * time);
        this.end.y = this.pivot.y + this.mag * Math.sin(this.phase + this.freq * time);
    }
}

let time = 0;

let vectorX = [];
let vectorY = [];
let trailX = [];
let trailY = [];
const letterT = [{ x: -50, y: 50 }, { x: -40, y: 50 }, { x: -30, y: 50 }, { x: -20, y: 50 }, { x: -10, y: 50 }, { x: 0, y: 50 }, { x: 10, y: 50 }, { x: 20, y: 50 }, { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 50, y: 30 }, { x: 40, y: 30 }, { x: 30, y: 30 }, { x: 20, y: 30 }, { x: 10, y: 30 }, { x: 10, y: 30 }, { x: 10, y: 20 }, { x: 10, y: 10 }, { x: 10, y: 0 }, { x: 10, y: -10 }, { x: 10, y: -20 }, { x: 10, y: -30 }, { x: 10, y: -40 }, { x: 10, y: -50 }, { x: 0, y: -50 }, { x: -10, y: -50 }, { x: -10, y: -40 }, { x: -10, y: -30 }, { x: -10, y: -20 }, { x: -10, y: -10 }, { x: -10, y: 0 }, { x: -10, y: 10 }, { x: -10, y: 20 }, { x: -10, y: 30 }, { x: -10, y: 30 }, { x: -20, y: 30 }, { x: -30, y: 30 }, { x: -40, y: 30 }, { x: -50, y: 30 }, { x: -50, y: 50 }];
const TRN = [
{x:-217,y:75},
{x:-186,y:75},
{x:-155,y:75},
{x:-121,y:75},
{x:-92,y:75},
{x:-92,y:71},
{x:-92,y:67},
{x:-92,y:57},
{x:-92,y:40},
{x:-117,y:40},
{x:-137,y:40},
{x:-137,y:30},
{x:-137,y:19},
{x:-137,y:2},
{x:-137,y:-20},
{x:-137,y:-36},
{x:-137,y:-46},
{x:-137,y:-56},
{x:-137,y:-66},
{x:-137,y:-75},


{x:-123.25,y:-75},
{x:-104.5,y:-75},
{x:-85.75,y:-75},
{x:-67,y:-75},
{x:-67,y:-45},
{x:-67,y:-15},
{x:-67,y:0},
{x:-67,y:15},
{x:-67,y:45},

{x:-67,y:75},
{x:-17,y:75},
{x:32,y:75},
{x:50,y:58},

{x:67,y:40},
{x:67,y:22},
{x:67,y:5},
{x:52,y:-8},
{x:37,y:-20},

{x:52,y:-47},
{x:67,y:-75},
{x:77,y:-75},
{x:87,y:-75},
{x:97,y:-75},
// N
{x:107,y:-75},
{x:107,y:-50},
{x:107,y:-25},
{x:107,y:0},
{x:107,y:25},
{x:107,y:50},
{x:107,y:75},
{x:117,y:75},
{x:127,y:75},
{x:137,y:75},
{x:157,y:75},
{x:157,y:75},
{x:169,y:51},
{x:194,y:0},
{x:207,y:-25},

{x:207,y:25},
{x:207,y:75},
{x:225,y:75},
{x:245,y:75},
{x:245,y:65},
{x:245,y:50},
{x:245,y:25},
{x:245,y:15},
{x:245,y:0},
{x:245,y:-15},
{x:245,y:-25},
{x:245,y:-50},
{x:245,y:-65},
{x:245,y:-75},
{x:212,y:-75},
{x:192,y:-75},
{x:182,y:-55},
{x:177,y:-45},
{x:167,y:-25},
{x:154.5,y:0},
{x:142,y:25},
{x:142,y:-25},
{x:142,y:-75},
{x:125,y:-75},
{x:107,y:-75},

//r
{x:40,y:-75},
{x:12,y:-75},
{x:-0,y:-52},
{x:-12,y:-30},
{x:-20,y:-30},
{x:-27,y:-30},
{x:-27,y:-52},
{x:-27,y:-75},
{x:-47,y:-75},
{x:-67,y:-75},


{x:-172,y:-75},
{x:-172,y:-17},
{x:-172,y:40},
{x:-205,y:40},
{x:-217,y:40},
{x:-217,y:58},
{x:-217,y:75}
];

let scl = 2.5;
function setup(points) {
    
    const signalReal = points.map(p => p.x/scl);
    const signalImag = points.map(p => -p.y/scl);
    const dftX = dft(signalReal).sort((a, b) => b.amp - a.amp);
    const dftY = dft(signalImag).sort((a, b) => b.amp - a.amp);
   
    dt = Math.log10(points.length)/2;
    
    let pivot = { x: cnv.width / 2, y: cnv.height / 2-200 };
    for (let i = 0; i < dftX.length; i++) {
        const v = new rotatingVector(pivot, dftX[i].amp, dftX[i].freq, dftX[i].phase);
        vectorX.push(v);
        pivot = v.end;
    }
    pivot = { x: cnv.width / 2-300, y: cnv.height / 2 };
    for (let i = 0; i < dftY.length; i++) {
        const v = new rotatingVector(pivot, dftY[i].amp, dftY[i].freq, Math.PI/2 +dftY[i].phase);
        vectorY.push(v);
        pivot = v.end;
    }
    TRAIL_COUNT = points.length*0.95/dt;
}
function drawTrail(){
    ctx.save();
    ctx.beginPath();
    if(trailX.length<=1) return;
    ctx.moveTo(trailX[0], trailY[0]);
    for(let i=1;i<trailX.length;i++){
        ctx.lineTo(trailX[i], trailY[i]);
    };
    ctx.strokeStyle = 'rgba(255,0,0,1)';
    ctx.stroke();
    ctx.restore();
}
 
let drawing = false;
let drawnPoints = [];

cnv.addEventListener("mousedown", e => {
    
    drawing = true;
    drawnPoints = [];
    cancelAnimationFrame(anim);
    anim = 0;
});

cnv.addEventListener("mousemove", e => {
    if (!drawing) return;
    if(Math.abs(e.movementX) < 1 && Math.abs(e.movementY) < 1) return; // Skip if the mouse hasn't actually moved
    const rect = cnv.getBoundingClientRect();
    const x = e.clientX - rect.left - cnv.width/2;
    const y = rect.bottom - e.clientY - cnv.height/2;
    ctx.beginPath();
    if(drawnPoints.length>0) {
        const lastPoint = drawnPoints[drawnPoints.length - 1];
        ctx.moveTo(lastPoint.x + cnv.width/2,cnv.height/2-lastPoint.y);
        ctx.lineTo(x + cnv.width/2, cnv.height/2-y);
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.stroke();
    }
    drawnPoints.push({ x, y });
    
});
cnv.addEventListener("mouseup", e => {
    if (!drawing) return;
    
    processDrawing();
});
cnv.addEventListener("mouseleave", e => {
    if (!drawing) return;
    drawing = false;
    drawnPoints = [];
    anim = requestAnimationFrame(draw);
});
function processDrawing() {
    drawing = false;
    if (drawnPoints.length > 1) {
        vectorX = [];
        vectorY = [];
        trailX = [];
        trailY = [];
        if(Math.sqrt(Math.pow(drawnPoints[0].x - drawnPoints[drawnPoints.length-1].x,2) + Math.pow(drawnPoints[0].y - drawnPoints[drawnPoints.length-1].y,2)) < 20) {
            drawnPoints.push(drawnPoints[0]); // Close the shape by adding the first point at the end
        }else {
            const reversedPoints = drawnPoints.slice().reverse();
            drawnPoints.push(...reversedPoints);
        }
        setup(drawnPoints);
        anim = requestAnimationFrame(draw);
    }
}

let anim=0;

function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (let i = 0; i < vectorX.length; i++) {
        vectorX[i].update(time);
        vectorX[i].draw();
    }
    for (let i = 0; i < vectorY.length; i++) {
        vectorY[i].update(time);
        vectorY[i].draw();
    }
    drawTrail();
    time += dt;
    anim=requestAnimationFrame(draw);
}
setup(TRN);
draw();