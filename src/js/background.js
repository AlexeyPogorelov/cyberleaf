const c = document.getElementById("hero-canvas"),
	rad = Math.PI / 180,
	ctx = c.getContext("2d");

var frames = 0,
	cw = c.width = window.innerWidth,
	cx = cw / 2,
	ch = c.height = window.innerHeight,
	cy = ch / 2,
	R = Math.min(cx, cy) / 2, // amoeb radius
	points = [];


	ctx.strokeStyle = "#f22e58";

	window.addEventListener('resize', function () {
		cw = window.innerWidth;
		ch = window.innerHeight;
		cx = cw / 2;
		cy = ch / 2;
		R = Math.min(cx, cy) / 2;
		updatePoints();
	}, false);

function Point(a) {
	this.rand = rnd() * 360;
	this.a = a;
	this.r = R + R / 5 * Math.sin(this.rand * rad);
	this.x = cx + this.r * Math.cos(a * rad);
	this.y = cy + this.r * Math.sin(a * rad);
}

function createPoints() {
	var step = 30; // how much points
	for(let a = 0; a < 360; a += step) {
		points.push( new Point(a) );
	}
}
createPoints();

function updatePoints() {
	var step = 360 / points.length;
	for(let i = 0; i < points.length; i++) { // how much points
		let a = points[i].a;
		points[i].r = R + R / 5 * Math.sin(points[i].rand * rad);
		points[i].x = cx + points[i].r * Math.cos(a * rad);
		points[i].y = cy + points[i].r * Math.sin(a * rad);
	}
}

function paintPoints(o) {
	var lastPointIndex = o.length - 1,
		pu0 = unionPoint(o, lastPointIndex, 0);
	ctx.fillStyle = rGrd(cx, cy, 1.2 * R);
	ctx.beginPath();
	ctx.moveTo(pu0.x, pu0.y);
	for (var i = 0; i < o.length - 1; i++) {
		var pui = unionPoint(o, i, i + 1); 
		ctx.quadraticCurveTo(o[i].x, o[i].y, pui.x, pui.y); 
	}
	ctx.quadraticCurveTo(o[lastPointIndex].x, o[lastPointIndex].y, pu0.x, pu0.y);
	ctx.fill();
}

function unionPoint(obj, a, b) {
	var up = {};
	up.x = (obj[a].x + obj[b].x) / 2;
	up.y = (obj[a].y + obj[b].y) / 2;  
	return up;
}

function renderFrame() {
	frames++;

	ctx.clearRect(0, 0, cw, ch);

	for (var i = 0; i <= points.length - 1; i++) {
		let p = points[i];
		p.a += 0.1; // rotate speed
		p.r = R + (R / 5.5) * Math.sin((frames + p.rand) * rad);
		p.x = cx + p.r * Math.cos(p.a * rad);
		p.y = cy + p.r * Math.sin(p.a * rad);
	}

	paintPoints(points);

	window.requestAnimationFrame(renderFrame);
}

window.requestAnimationFrame(renderFrame);

function rGrd(x, y, r) {
	if (typeof x !=='number' || typeof y !=='number' || typeof r !=='number' || isNaN(x) || isNaN(y) || isNaN(r)) return;
	let gradient;
	gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
	gradient.addColorStop(0, "#28dc25");
	gradient.addColorStop(0.3, "#28dc25");
	gradient.addColorStop(1, "#28dc25");
	return gradient;
}

function rnd() { // @tmrDevelops : just alternative for Math.random();
	Math.seed = (Math.seed * 108013 + 2531011) & 0xffffffff;
	return Math.abs(Math.seed >> 16) / 32869;
}
