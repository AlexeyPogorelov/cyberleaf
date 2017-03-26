var scrollTop = 0,
	windowWidth = 0,
	windowHeight = 0;

function Breakpoints (top) {
	this.top = top;
	this.current = undefined;
	this.breakpoints = [];
	this.names = [];
}
Breakpoints.prototype.add = function (name, top) {
	this.names.push(name);
	this.breakpoints.push(top);
}
Breakpoints.prototype.clearAll = function () {
	this.breakpoints = [];
	this.names = [];
}
Breakpoints.prototype.getCurrent = function () {
	var i;
	for (i = 0; i < this.breakpoints.length; i++) {
		if (this.breakpoints[i] >= this.top) {
			break;
		}
	}
	console.log(this.names[i - 1]);
}
Breakpoints.prototype.update = function (top) {
	this.top = top;
}
var breakpoints = new Breakpoints(scrollTop);

window.addEventListener('scroll', scrollEvent)
window.addEventListener('resize', recalculateBreakpoints)
window.addEventListener('click', breakpoints.getCurrent.bind(breakpoints))

function scrollEvent () {
	scroll = window.pageYOffset;
	breakpoints.update(scroll);
}

function recalculateBreakpoints () {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	var sections = document.querySelectorAll('section'),
		i;

	scrollEvent();
	breakpoints.clearAll();

	for (i = 0; i < sections.length; i++) {
		if (!!sections[i].id) {
			breakpoints.add(
				sections[i].id,
				sections[i].getBoundingClientRect().top + scrollTop
			)
		}
	}
}
recalculateBreakpoints();
