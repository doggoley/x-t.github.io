var snowFall = document.getElementById("snow");

var randInt = function(max) {
	max += 1;
	return Math.floor(Math.random() * max);
};

var generateFlakes = setInterval(function() {
	var height = 0;
	var width = randInt(100);
	var flake = document.createElement("i");
	flake.setAttribute("class", "far fa-snowflake flake");
	flake.setAttribute("data-height", height);
	flake.setAttribute("data-width", width);
	flake.setAttribute("style", "top:"+height+"%;left:"+width+"%;");
	snowFall.appendChild(flake);
}, 1000);

var moveFlakes = setInterval(function() {
	var allFlakes = document.getElementsByClassName("flake");
	for (var i = allFlakes.length - 1; i > -1; --i) {
		var height = parseFloat(allFlakes[i].getAttribute("data-height"));
		var width = parseFloat(allFlakes[i].getAttribute("data-width"));
		if (height == 100 ||
			width == 100) {
			allFlakes[i].parentNode.removeChild(allFlakes[i]);
		} else {
			height += 0.1;
			width += 0.1;
			allFlakes[i].setAttribute("data-height", height);
			allFlakes[i].setAttribute("data-width", width);
			allFlakes[i].setAttribute("style", "top:"+height+"%;left:"+width+"%;");
		}
	}
}, 10);