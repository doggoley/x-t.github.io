/*******************************************
 * Licensed under BSD-2-Clause
 * More info - https://f00f.me/src
 * License - https://f00f.me/src/LICENSE.txt
 *******************************************/

function nle() {
    alert("This page no longer exists.");
}

var i = 0;

window.onload = function() {
	document.body.onkeydown = function(e) {
		switch (e.keyCode) {
			case 38:
				i += i === 0 || i === 1 ? 1 : -i;
				break;
			case 40:
				i += i === 2 || i === 3 ? 1 : -i;
				break;
			case 37:
				i += i === 4 || i === 6 ? 1 : -i;
				break;
			case 39:
				i += i === 5 || i === 7 ? 1 : -i;
				break;
			case 66:
				i += i === 8 ? 1 : -i;
				break;
			case 65:
				i += i === 9 ? 1 : -i;
				if (i === 10) {
					alert("Congratulations, the award is: nothing.");
				}
				break;
		}
	};

	var showContactEmail = document.getElementsByClassName('showContact1');
    var overlayEmail = document.getElementById('contactEmail');
	var showSupport = document.getElementsByClassName('showSupport');
	var overlaySupport = document.getElementById('support');

    // There are two navbars - one for mobile,
    // one for desktop.

    showContactEmail[0].onclick = function() {
        overlayEmail.style.display = 'block';
    };
    showSupport[0].onclick = function() {
        overlaySupport.style.display = 'block';
    };
    showContactEmail[1].onclick = function() {
        overlayEmail.style.display = 'block';
    };
    showSupport[1].onclick = function() {
        overlaySupport.style.display = 'block';
    };

    window.onclick = function(event) {
        if (event.target == overlayEmail) {
            overlayEmail.style.display = 'none';
        } else if (event.target == overlaySupport) {
        	overlaySupport.style.display = 'none';
        }
    };
};

console.log("Hello.");
console.log("I don't hire. In fact, legally (and financially) I can't.");
console.log("But you're free to look.");
console.log("Find the licensing information here -> https://f00f.me/src");


/*
     FILE ARCHIVED ON 22:47:36 Oct 03, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:54 Jul 07, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  CDXLines.iter: 14.088 (3)
  captures_list: 4383.454
  exclusion.robots: 0.328
  PetaboxLoader3.resolve: 87.661 (2)
  exclusion.robots.policy: 0.313
  RedisCDXSource: 2.751
  esindex: 0.017
  PetaboxLoader3.datanode: 4333.146 (4)
  load_resource: 96.282
  LoadShardBlock: 4362.794 (3)
*/
