window.onload = function() {
	var body = document.getElementsByTagName("body")[0];
	var rip = document.createElement("p");
	rip.setAttribute("class", "c");
	rip.style.fontSize = "400%";
	rip.innerHTML = "R.I.P Terry A. Davis";
	body.insertBefore(rip, body.children[4]);
}