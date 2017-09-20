function dec2hex(d) {
	var hex = Number(d).toString(16);
	padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
	while (hex.length < padding) {
		hex = "0" + hex;
	}
	return hex;
}
function time2color(variant, hours, minutes, seconds) {
	var result = [];
	for (var i=0; i < variant.length; i++) {
		switch(variant[i]) {
			case 'h':
				result.push(dec2hex(parseInt((hours / 24) * 255)));
				break;
			case 'm':
				result.push(dec2hex(parseInt((minutes / 60) * 255)));
				break;
			case 's':
				result.push(dec2hex(parseInt((seconds / 60) * 255)));
				break;
		}
	};
	return result.join('');
}
function getvariant() {
	if(/^#[hsm]{3}$/.test(window.location.hash)) {
		return window.location.hash.substr(1);
	}
	return 'hms';
}
$(function() {
	var time = $('#time')
		,hex = $('#hex')
		,body = $('body')
		,clockupdate
		;
	$(window).resize(function() {
		$('#clockframe').height(window.innerHeight - 25);
	}).resize();
	$('#selectors a').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).addClass('active').blur().siblings().removeClass('active');
		$($(this).attr('href')).show().siblings('.time-display').hide();
	});
	clockupdate = function() {
		var t = new Date(),
			hours = t.getHours()
			,minutes = t.getMinutes()
			,seconds = t.getSeconds()
			,color = time2color(getvariant(), hours, minutes, seconds)
			;

		hex.html(color);
		time.html(
			(hours < 10 ? '0' : '') +
			hours +
			':' +
			(minutes < 10 ? '0' : '') +
			minutes +
			':' +
			(seconds < 10 ? '0' : '') +
			seconds
			);

		body.animate({'background-color': '#'+color});
	};
	clockupdate();
	setInterval(clockupdate, 1000);
});