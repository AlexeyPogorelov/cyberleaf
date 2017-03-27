var scrollTop = 0,
	windowWidth = 0,
	windowHeight = 0;

function Breakpoints (selector) {
	this.current = undefined;
	this.changeCallbacks = [];
	this.breakpoints = [];
	this.names = [];
	if (selector) {
		this.fill(selector);
	}
}
Breakpoints.prototype.fill = function (selector) {
	var sections = document.querySelectorAll(selector || 'section'),
		top = window.pageYOffset || 0;

	this.clearBreakpoints();

	for (i = 0; i < sections.length; i++) {
		if (!!sections[i].id) {
			breakpoints.add(
				sections[i].id,
				sections[i].getBoundingClientRect().top + top
			)
		}
	}
}
Breakpoints.prototype.add = function (name, top) {
	this.names.push(name);
	this.breakpoints.push(top);
}
Breakpoints.prototype.clearBreakpoints = function () {
	this.breakpoints = [];
	this.names = [];
}
Breakpoints.prototype.clearCallbacks = function () {
	this.changeCallbacks = [];
}
Breakpoints.prototype.getCurrentNumber = function (top, offset) {
	var i;
	top += offset;
	for (i = 0; i < this.breakpoints.length; i++) {
		if (this.breakpoints[i] >= top) {
			break;
		}
	}
	i = i > 1 ? i - 1 : 0;
	return i;
}
Breakpoints.prototype.setProgress = function (top, offset, start, end) {
	top += offset;
	this.progress = (top - start) / (end - start);
}
Breakpoints.prototype.getProgress = function () {
	return this.progress;
}
Breakpoints.prototype.getCurrent = function () {
	return this.current;
}
Breakpoints.prototype.update = function (top, windowHeight) {
	var current,
		i = this.getCurrentNumber(top, windowHeight / 2);
	current = this.names[i];
	if (current !== this.current) {
		this.current = current;
		this.fireCallbacks(current);
	}
	this.setProgress(
		top,
		windowHeight / 2,
		this.breakpoints[i],
		this.breakpoints[i + 1]
	);
}
Breakpoints.prototype.fireCallbacks = function (current) {
	var i;
	for (i = 0; i < this.changeCallbacks.length; i++) {
		this.changeCallbacks[i].call(this, current);
	}
}
Breakpoints.prototype.onChange = function (fun) {
	this.changeCallbacks.push(fun);
}
var breakpoints = new Breakpoints();

// window.addEventListener('scroll', scrollEvent);
window.addEventListener('resize', recalculateBreakpoints);
// window.addEventListener('DOMContentLoaded', recalculateBreakpoints);
window.addEventListener('load', recalculateBreakpoints);
// window.addEventListener('click', breakpoints.getProgress.bind(breakpoints));

// function scrollEvent () {
// 	scrollTop = window.pageYOffset;
// 	breakpoints.update(scrollTop, windowHeight);
// }

function recalculateBreakpoints () {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	scrollTop = window.pageYOffset;
	// scrollEvent();
	breakpoints.fill('section');
	breakpoints.update(scrollTop, windowHeight);
}

// breakpoints.onChange.call(breakpoints, function (state) {
// 	console.log(state);
// });
