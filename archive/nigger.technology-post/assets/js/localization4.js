/*
 * Localization for nigger.technology
 * Version labs-4.0-insiders-beta-alpha-indev-infdev
 * Work of principle:
 * Replace all strings with translated ones in real-time using JS.
 * Copyright (C) 2019 nigger.technology
 */


function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));	
	var expires = "expires="+ d.toUTCString();	
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
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

var currentLanguage = {
	code: 'en',
	location: 'unknown'
}

var languages = [];
var translate = {};

function changeLang(s) {
	setCookie("langSel", s, 365);
	checkLanguage();
}

function applyLanguage() {
	var lSel = getCookie("langSel").toLowerCase();
	currentLanguage.code = lSel;
	$.each(translate[lSel], function(index, value) {
		try {
			$('#'+index).html(value);
		} catch {}
	});
	genDropdown(languages);
}

function checkLanguage() {
	var lSel = getCookie("langSel").toLowerCase();
	if (lSel === "") {
		// First time seen branch
		if (currentLanguage.location === "unknown") {
			// Error (English default)
			setCookie("langSel", 'en', 365);
			applyLanguage();
		} else if (languages.includes(currentLanguage.location)) {
			// Localized
			setCookie("langSel", currentLanguage.location, 365);
			applyLanguage();
		} else {
			// Unlocalized (English default)
			setCookie("langSel", 'en', 365);
			applyLanguage();
		}
	} else {
		applyLanguage();
	}
}

function checkLocation() {
	try {
		var geodata = JSON.parse(Get('https://freegeoip.app/json/'));
		currentLanguage.location = geodata.country_code.toLowerCase();
	} catch {
		currentLanguage.location = "unknown";
		console.log("%cAdblock detected\n%cFailure to detect your location led us to realize that you have adblock on.\nWe don't serve shit, asswipe.", "color:lightred;font-size:150%", "color:default;font-size:100%");
	}
}

function genDropdown(langs) {
	var x = [];
	var lSel = getCookie("langSel").toLowerCase();

	$.each(langs, function(index, value) {
		var y = {};
		if (value == lSel)
			return;
		y.text = getEmojiFlag(value) + " " + value.toUpperCase();
		y.code = value;
		x.push(y);
	});

	var el = document.getElementById("lang-dropdown").parentElement.children[1];
	// <a class="dropdown-item" role="presentation" href="#">Sample</a>
	$(el).empty();
	$.each(x, function(index, value) {
		var d = document.createElement('a');
		$(d).addClass("dropdown-item")
			.html(value.text)
			.attr("role", "presentation")
			.attr("href", "javascript:changeLang('"+value.code+"')")
			.appendTo(el);
	});

	// Change main button
	$('#lang-dropdown').html(getEmojiFlag(lSel)+" "+ lSel.toUpperCase());
}

function getEmojiFlag(str) {
	if (str == 'en') return '🇺🇸';
	return str.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
}

$.getJSON("/strings/strings.json", function(json) {
	languages = json.langs;
	translate = json.translate;
	checkLocation();
	checkLanguage();
}).fail(function () {
	console.log("Fatal: unable to get strings.json");
	var el = document.getElementById("lang-dropdown").parentElement.children[1];
	var d = document.createElement('a');
	$(d).addClass("dropdown-item")
		.html("Must be hosted on root for language selection.")
		.attr("role", "presentation")
		.appendTo(el);
});