var snowFall = document.getElementById("snow");

var randInt = function(max) {
	max += 1;
	return Math.floor(Math.random() * max) + 1;
};

var fallDirection = "right";
var _xpos = 0;
var _ypos = 0;

function findObjectCoords(mouseEvent)
{
// spaghetti thing from some blog

  var obj = document.body;
  var obj_left = 0;
  var obj_top = 0;
  var xpos;
  var ypos;
  while (obj.offsetParent)
  {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  if (mouseEvent)
  {
    //Firefox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
  }
  else
  {
    //IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
  }
  xpos -= obj_left;
  ypos -= obj_top;

//  document.getElementById("objectCoords").innerHTML = xpos + ", " + ypos;

  if (xpos > _xpos + 10) fallDirection = "right";
  else if (xpos < _xpos - 10) fallDirection = "left";

  _xpos = xpos;
  _ypos = ypos;

}

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
		if (height >= 100 ||
			width >= 100 ||
			width <= 0) {
			allFlakes[i].parentNode.removeChild(allFlakes[i]);
		} else {
			height += 0.1;
			if (fallDirection == "right")
				width += 0.1;
			else if (fallDirection == "left")
				width -= 0.1;
			allFlakes[i].setAttribute("data-height", height);
			allFlakes[i].setAttribute("data-width", width);
			allFlakes[i].setAttribute("style", "top:"+height+"%;left:"+width+"%;");
		}
	}
}, 10);

document.body.onmousemove = findObjectCoords;
