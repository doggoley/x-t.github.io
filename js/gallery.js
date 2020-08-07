var content = document.getElementsByClassName("content")[0];
var br = document.getElementsByTagName("br");
for (var i = --br.length; i >= 0; i--)
	br[i].parentNode.removeChild(br[i]);
var maxWidth = 200;
var photos = content.getElementsByTagName("a");
var _images = {};

for (var i = 0; i < photos.length; i++) {
	_images[photos[i].innerHTML] = photos[i];
}

for (var i = 0; i < photos.length; i++) {
	var x = "";
	for (var k = --photos[i].innerHTML.length; k >= 0; k--) {
		if (photos[i].innerHTML.charAt(k) != ".")
			x = photos[i].innerHTML.charAt(k) + x;
		else
			break;
	}

	if (x != "jpg" && x != "png" && x != "JPG" && x != "PNG" && x != "jpeg" && x != "JPEG" && x != "gif")
		continue;

	var img = new Image();
	img.onload = function() {
		var width = this.width;
		while (width > maxWidth)
			width = width / 2;
		this.width = width;
		var p = "";
		var l = 0;
		for (var k = --this.src.length; k >= 0; k--) {
			if (this.src.charAt(k) != "/") {
				p = this.src.charAt(k) + p;
			} else if (this.src.charAt(k) == "/" && l != 1) {
				p = "/" + p;
				l = 1;
			} else {
				break;
			}
		}
		if (document.title == "Background gallery") {
			_images[p].removeAttribute("href");
			var str = _images[p].innerHTML;
			_images[p].onclick = function() {showPicture(str)};
		}
		_images[p].innerHTML = "";
		_images[p].appendChild(this);
	}
	img.src = photos[i].getAttribute("href");
}

function showPicture(pic) {
	document.getElementsByClassName("galleryGrid")[0].style.display = "none";
	/*
	 * <container:div>
	 *	<:br>
	 *	<button:buttonConstructor>
	 *	<:br>
	 *	<imgLink:a>
	 *		<image:img>
	 *	</imgLink:a>
	 *	<copyrightInfo:p>
	 * </container:div>
	 */
	var container = document.createElement("div");
	var copyrightInfo = document.createElement("p");
	var imgLink = document.createElement("a");
	var image = new Image();
	image.onload = function() {
		while (this.width > window.innerWidth - 200)
			this.width = this.width / 2;
		image.style.display = "block";
		copyrightInfo.style.display = "block";
	}
	image.src = pic;
	imgLink.setAttribute("href", pic);
	image.style.margin = "auto";
	copyrightInfo.setAttribute("class", "c");
	imgLink.appendChild(image);
	image.style.display = "none";
	copyrightInfo.style.display = "none";
	copyrightInfo.innerHTML = _images[pic].getAttribute("data-copyright");
	container.appendChild(document.createElement("br"));
	container.appendChild(makeButton('<i class="fas fa-arrow-left"></i> Go back', showGallery));
	container.appendChild(document.createElement("br"));
	container.appendChild(imgLink);
	container.appendChild(copyrightInfo);
	content.appendChild(container);
}

function showGallery() {
	content.removeChild(content.lastElementChild);
	document.getElementsByClassName("galleryGrid")[0].style.display = "grid";
}

function makeButton(text, onclick) {
	var c = document.createElement("div");
	var l = document.createElement("a");
	var b = document.createElement("div");
	c.setAttribute("class", "c contactList");
	b.setAttribute("class", "button"); b.innerHTML = text;
	l.onclick = onclick;
	c.appendChild(l); l.appendChild(b);
	return c;
}