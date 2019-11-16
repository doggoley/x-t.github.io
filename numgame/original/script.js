var eq = document.getElementById("eq");
var score = document.getElementById("score");
var btn = document.getElementById("thatbutton");
var errfield = document.getElementById("error");
var timerf = document.getElementById("timer");
var keyboardInstr = document.getElementById("keyboardInstr");
var num1 = 0;
var num2 = 0;
var sum = 0;
var inp = 0;
var op = "";
var cor = 0;
var fail = 0;
var maxval = 0;
var timer = '';
var ourtime = 0;
var s1 = 0;

function a(num) {
	if (num === 'minus') {
		btn.innerHTML = "+";
		btn.setAttribute('onclick', 'a(\'plus\')');
		inp = -inp;
		if (inp != 0)
			eq.innerHTML = num1 + op + num2 + "= " + inp;
		else
			eq.innerHTML = num1 + op + num2 + "= " + "-";
		return;
	} else if (num === 'plus') {
		btn.innerHTML = "-";
		btn.setAttribute('onclick', 'a(\'minus\')');
		inp = Math.abs(inp);
		if (inp != 0)
			eq.innerHTML = num1 + op + num2 + "= " + inp;
		else
			eq.innerHTML = num1 + op + num2 + "= ";
		return;
	}

	if (inp == 0)
		inp = "" + num;
	else
		inp = "" + inp + num;

	eq.innerHTML += num;
}

function s() {
	inp = parseInt(inp);
	if (btn.getAttribute("onclick") == 'a(\'plus\')')
		inp = -inp;

	if (inp == sum) {
		cor++;
		r();
	} else {
		fail++;
		r();
	}
	setTimeout(function() {
		g();
		resetCounter();
	}, 300);
}

function g() {
	var r1 = Math.floor(Math.random() * maxval);
	var r2 = Math.floor(Math.random() * maxval);
	var r3 = Math.floor(Math.random() * 3);
	num1 = r1;
	num2 = r2;
	switch(r3) {
		case 0:
			op = "+";
			sum = num1 + num2;
			break;
		case 1:
			op = "-";
			sum = num1 - num2;
			break;
		case 2:
			op = "*";
			sum = num1 * num2;
			break;
	}
	eq.innerHTML = num1 + op + num2 + "= ";
	inp = "";
	a('plus');
}

function r() {
	score.innerHTML = "Success: " + cor + "<br />Failed: " + fail;
}

function bs() {
	if (inp == 0)
		return;
	if (inp.toString().length != 1) {
		if (inp.toString()[0] == "-" && inp.toString().length == 2) {
			inp = 0;
			a('plus');
			eq.innerHTML = num1 + op + num2 + "= ";
			return;
		}
		inp = parseInt(inp.toString().slice(0, -1));
		eq.innerHTML = num1 + op + num2 + "= " + inp;
	} else {
		inp = 0;
		eq.innerHTML = num1 + op + num2 + "= ";
	}
}

function clearError() {
	errfield.innerHTML = "";
}

function startGame() {
	var maxvl = document.getElementById("gameSetupMax").value;
	var time = document.getElementById("gameSetupTime").value;
	if (maxvl == 0 || time == 0) {
		errfield.innerHTML = "You cannot set values to 0";
		return;
	} else {
		clearError();
		document.getElementById("gameSetup").style.display = "none";
        setTimeout(
            function() {
                keyboardInstr.style.display = "none";
            }, 10000
        );
		document.body.onkeydown = function(e) {
			if (e.keyCode == 13) {
				s();
			} else if (e.keyCode >= 48 && e.keyCode <= 57) {
				a(parseInt(String.fromCharCode(e.keyCode)));
			} else if (e.keyCode == 8) {
				bs();
			} else if (e.keyCode == 80) {
				if (btn.getAttribute("onclick") == 'a(\'plus\')')
					a('plus');
				else
					a('minus');
			} else if (e.keyCode >= 96 && e.keyCode <= 105) {
                a(e.keyCode - 96);
			}
		};
		maxval = maxvl;
		ourtime = parseInt(time) + 1;
		resetCounter();
		document.getElementById("table").style.display = "block";
		g();
	}
}

function resetCounter() {
	clearInterval(timer);
	s1 = 0;
	timer = setInterval(function() {
		s1++;
		if (s1 === ourtime) {
			s1 = 0;
			s();
		} else {
			timerf.innerHTML = (ourtime - s1) + "s left.";
		}
	}, 1000);
}
