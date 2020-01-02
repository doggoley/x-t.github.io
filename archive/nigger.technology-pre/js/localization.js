/*
 *	This is some enterprise-tier code
 *	You may not like it, but its only job is to work, not look good.
 *	(C) nigger.technology corp. 2019
 */



// thanks stackoverflow :*
function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

// thanks w3schools :*
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));	
	var expires = "expires="+ d.toUTCString();	
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
	  c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
	  return c.substring(name.length, c.length);
	}
  }
  return "";
}

// finally, my code

console.log("%cSuper mega advanced localization script\n%cv3.0%c\n(C) https://nigger.technology", "color:lightblue;font-size:200%", "color:default;font-size:150%;", "color:default;font-size:100%");

var langs = ["LT","EE","RO","DE","PL","CZ","IT","RS"];

function setLang(l) {
	setCookie("langSel", l.code, 365);
	window.location.href = l.redirect;
}

function setLocalButton(c) {
	var b = document.getElementById("localized");
	b.style.display = "inline";
	b.innerHTML = c;
}

function checkSubst(s1, s2) {
	return s1.indexOf(s2) !== -1;
}

var adblockDetected = false;

/*-------------------------
    Detecting location
-------------------------*/

try {
	var geodata = JSON.parse(Get('https://freegeoip.app/json/'));
	var country = geodata.country_code;
} catch {
	var country = "";
	adblockDetected = true;
	console.log("%cAdblock detected\n%cFailure to detect your location led us to realize that you have adblock on.\nWe don't serve shit, asswipe.", "color:lightred;font-size:150%", "color:default;font-size:100%");
}

/*----------------------------
    Generating language list
------------------------------*/

var curPath = window.location.pathname;
var filename = curPath.substring(curPath.lastIndexOf('/')+1);
var dropCunts = (function() {
	var x = [{text:"🇺🇸 EN",redirect:"/archive/nigger.technology-pre",code:"EN"}];
	for (var i = 0; i < langs.length; i++) {
    	x.push({
    		text: langs[i].toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397)) + " " + langs[i],
    		redirect: "/archive/nigger.technology-pre/" + langs[i].toLowerCase(),
    		code: langs[i]
    	});
	}
	if (LOCALIZED === true) {
		// User is in translated page, move the language to top
		for (var i = 0; i < x.length; i++) {
			if (checkSubst(curPath, x[i].code.toLowerCase())) {
				temp = x[0];
				x[0] = x[i];
				x[i] = temp;
				// English should always be second, as it was
				// first, it'll be now x[i]
				temp = x[1];
				x[1] = x[i];
				x[i] = temp;
			}
		}
	}
	return x;
}());

/*-------------------------
    Generating dropdown
-------------------------*/

if (adblockDetected === true)
    dropCunts[0].text += " (Location error)";

var dropBtn = document.createElement("button");
var dropCont = document.createElement("div");
dropBtn.setAttribute("class", "dropbtn");
dropCont.setAttribute("class", "dropdown-content");
// Hacky solution for first element
var d = document.createElement("a");
d.setAttribute("href", "javascript:setLang(dropCunts[0])");
d.innerHTML = dropCunts[0].text;
dropBtn.appendChild(d);
var _d = [];
for (var i = 1; i < dropCunts.length; i++) {
	_d[i] = document.createElement("a");
	_d[i].setAttribute("href", "javascript:setLang(dropCunts[" + i + "])");
	_d[i].innerHTML = dropCunts[i].text;
	dropCont.appendChild(_d[i]);
	if (!(i & 1)) {
		// I can't seem to understand CSS, so
		// every 2 elements I'm adding a newline.
		var x = document.createElement("br");
		dropCont.appendChild(x);
	}
}

/*-------------------------
    Language redirection
-------------------------*/

var lSel = getCookie("langSel");

if (LOCALIZED === false && lSel === "") {
	// No language has been set, we're in English.
	for (var i = 0; i < langs.length; i++) {
		if (country == langs[i])
			/*	In non-localized pages, langs[i] is exactly the same 
				as dropCunts[i] */
			setLang(dropCunts[i]);
	}
	// User hasn't got the language, defaulting to English.
	setCookie("langSel", "EN", 365);
}

if (lSel !== "" && lSel !== "EN") {
	// Are we in the correct language page?
	if (!(checkSubst(curPath, lSel.toLowerCase()))) {
		// Evaluates true when curPath doesn't have lSel
		window.location.href = "/" + lSel.toLowerCase()+ "/" + filename;
	}
} else if (lSel === "EN") {
	if (!(LOCALIZED === false && lSel === "EN")) {
		window.location.href = "/" + filename;
	}
}

/*-------------------------
    Dropdown application
-------------------------*/

window.onload = function() {
	var dropMain = document.getElementsByClassName("dropdown")[0];
	dropMain.appendChild(dropBtn);
	dropMain.appendChild(dropCont);
}