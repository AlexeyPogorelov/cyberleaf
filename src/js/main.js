
if ($.browser.mobile) $('body').addClass('mobile');
if ($.browser.safari) $('body').addClass('safari');
if ($.browser.iphone || $.browser.ipad || $.browser.ipod ) $('body').addClass('ios');

$(document).on('ready', function () {
	var $window = $(window),
		windowWidth = $window.width(),
		windowHeight = $window.height(),
		bodyHeight = $('body').height();


		// resize
		$window.on('resize', function () {

			windowWidth = $window.width();
			windowHeight = $window.height();
			bodyHeight = $('body').height();

		});

});
