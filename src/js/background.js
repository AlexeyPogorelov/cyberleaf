
function Background (canvas) {
	this.rad = Math.PI / 180;
	this.ctx = canvas.getContext("2d");
	this.frames = 0;
	this.height = windowHeight;
	this.heightHalf = this.height / 2;
	this.width = windowWidth;
	this.widthHalf = this.width / 2;
	canvas.height = this.height;
	canvas.width = this.width;
}

Background.prototype.renderFrame = function () {
	// this.frames++;
	this.updateState();

	this.ctx.clearRect(0, 0, this.width, this.height);

	// demo
	breakpoints.getCurrent();

	var progress = breakpoints.getProgress();
	// progress = Math.floor(progress * 255).toString(16);
	// if (progress.length === 1) {
	// 	progress = '0' + progress;
	// }

	// this.radialGradient(progress + progress + progress, progress + progress + progress);
	this.ctx.font="60px Verdana";
	this.ctx.fillText( Math.floor(progress * 100) ,200, 200, 400 );
};

Background.prototype.radialGradient = function (from, to) {
	var gradient = this.ctx.createRadialGradient(
		this.widthHalf,
		this.heightHalf,
		0,
		this.widthHalf,
		this.heightHalf,
		this.widthHalf
	);
	gradient.addColorStop(0, "#" + from);
	gradient.addColorStop(1, "#" + to);
	this.ctx.fillStyle = gradient;
	this.ctx.fillRect(0, 0, this.width, this.height);
};

Background.prototype.updateState = function () {
	scrollTop = window.pageYOffset;
	breakpoints.update(scrollTop, windowHeight);
};

Background.prototype.rnd = function () { // @tmrDevelops : just alternative for Math.random();
	Math.seed = (Math.seed * 108013 + 2531011) & 0xffffffff;
	return Math.abs(Math.seed >> 16) / 32869;
};






setTimeout(function () {

	var background = new Background(
		document.getElementById("hero-canvas")
	);

	setTimeout(function () {
		(function loop() {
			background.renderFrame();
			window.requestAnimationFrame(loop);
		})();
	}, 200);

}, 200);

