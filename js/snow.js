var snow = {
	snowFall: document.getElementById("snow"),
	direction: "right",
	xpos: 0,
	ypos: 0,
	rand: function(max) {
		return Math.floor(Math.random() * (max + 1)) + 1;
	},
	generateFlakes: function() {
		var height = 0;
		var width = snow.rand(100);
		var flake = document.createElement("i");
		flake.setAttribute("class", "far fa-snowflake flake");
		flake.setAttribute("data-height", height);
		flake.setAttribute("data-width", width);
		flake.setAttribute("style", "top:"+height+"%;left:"+width+"%;");
		snow.snowFall.appendChild(flake);
	},
	moveFlakes: function() {
		var allFlakes = document.getElementsByClassName("flake");
		for (var i = allFlakes.length - 1; i > -1; --i) {
			var height = parseFloat(allFlakes[i].getAttribute("data-height"));
			var width = parseFloat(allFlakes[i].getAttribute("data-width"));
			if (height >= 100 ||
				width >= 100 ||
				width <= 0) {
				allFlakes[i].parentNode.removeChild(allFlakes[i]);
			} else {
				height += 0.1;
				if (snow.direction == "right")
				width += 0.1;
				else if (snow.direction == "left")
				width -= 0.1;
				allFlakes[i].setAttribute("data-height", height);
				allFlakes[i].setAttribute("data-width", width);
				allFlakes[i].setAttribute("style", "top:"+height+"%;left:"+width+"%;");
			}
		}
	},
	findObjectCoords: function(mouseEvent) {
		var obj = document.body;
		var obj_left = 0;
		var obj_top = 0;
		var xpos;
		var ypos;
		while (obj.offsetParent) {
			obj_left += obj.offsetLeft;
			obj_top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		if (mouseEvent) {
			//Firefox
			xpos = mouseEvent.pageX;
			ypos = mouseEvent.pageY;
		} else {
			//IE
			xpos = window.event.x + document.body.scrollLeft - 2;
			ypos = window.event.y + document.body.scrollTop - 2;
		}
		xpos -= obj_left;
		ypos -= obj_top;

		if (xpos > snow.xpos + 10) snow.direction = "right";
		else if (xpos < snow.xpos - 10) snow.direction = "left";

		snow.xpos = xpos;
		snow.ypos = ypos;
	}
};

setInterval(snow.generateFlakes, 1000)
setInterval(snow.moveFlakes, 10);
document.body.onmousemove = snow.findObjectCoords;