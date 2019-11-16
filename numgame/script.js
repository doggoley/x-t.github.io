var el_gameSetup = document.getElementById("gameSetup");
var el_customSetup = document.getElementById("customSetup");
var el_gameSetupMax = document.getElementById("gameSetupMax");
var el_gameSetupTime = document.getElementById("gameSetupTime");
var el_btn1 = document.getElementById("btn1");
var el_btn2 = document.getElementById("btn2");
var el_btn3 = document.getElementById("btn3");
var el_btn4 = document.getElementById("btn4");
var el_gameSetupHelper = document.getElementById("gameSetupHelper");
var el_gameSetupNegatives = document.getElementById("gameSetupNegatives");
var el_gameTutorial = document.getElementById("gameTutorial");
var el_gameWindow = document.getElementById("gameWindow");
var el_operation = document.getElementById("operation");
var el_answer = document.getElementById("answer");
var el_progressBar = document.getElementById("progressBar");
var el_stats = document.getElementById("stats");
var el_customSetupErrorText = document.getElementById("customSetupErrorText");
var el_customSetupError = document.getElementById("customSetupError");
var el_btnNeg = document.getElementById("btnNeg");

var answer = 0;
var correct = 0;
var failed = 0;

var operation = {
	num1: 0,
	num2: 0,
	op: "",
	result: 0
}

var difficulties = {
	easy: {
		maxNumber: 20,
		time: 25,
		ops: ["+", "-"],
		helper: true,
		allowNegatives: false
	},
	medium: {
		maxNumber: 40,
		time: 20,
		ops: ["+", "-", "*", "/"],
		helper: true,
		allowNegatives: true
	},
	hard: {
		maxNumber: 100,
		time: 15,
		ops: ["+", "-", "*", "/"],
		helper: false,
		allowNegatives: true
	}
};

var mainDiff = {};

/*
	timer.time = time passed (s)
	timer.i = interval
*/
var timer = {};

function appendResult(num) {
	var btn = el_btnNeg;

	if (btn.innerHTML == '+' && el_answer.innerHTML == '-') {
		answer = "-" + num;
		el_answer.innerHTML += num;
		return;
	}

	if (answer == 0)
		answer = "" + num;
	else
		answer = "" + answer + num;

	el_answer.innerHTML += num;
}

function toggleNegative() {
	var el = el_answer;
	var btn = el_btnNeg;

	if (answer == 0) {
		// Append a -
		btn.innerHTML = '+';
		el.innerHTML = '-';
		return;
	} else if (answer < 0) {
		// Flip negative->positive
		answer = Math.abs(answer);
		el.innerHTML = answer;
		btn.innerHTML = '-';
	} else if (answer > 0) {
		// Flip positive->negative
		answer = -answer;
		el.innerHTML = answer;
		btn.innerHTML = '+';
	}
}

function submitResult() {
	if (parseInt(answer) == operation.res)
		correct++;
	else
		failed++;

	refreshScore();

	setTimeout(function() {
		operation = generateNumber();
		refreshGameWindow();
		resetCounter();
	}, 300);

	console.log("Result submitted");
}

function generateNumber() {
	var newNum = {};

	if (mainDiff.helper === true) {
		/*	If helper is on,

			Chance : behaviour
			50% : The first number should be bigger than the second
			25% : The numbers generated will be smaller/equal to the half of maxNumber
			10% : Numbers end with 5 or 0
		*/

		var checks = [
			/*
				check[i].c() - chance
				check[i].f(a, b) - a = num1, b = num2, if c is true, f must return true to continue 
			*/
			{
				c: function() { var r = randNum(100); return r <= 75 && r >= 25; },
				f: function(a, b) { return a > b; }
			},
			{
				c: function() { var r = randNum(100); return r <= 100 && r >= 75; },
				f: function(a, b) { return (a <= (mainDiff.maxNumber / 2)) && (b <= (mainDiff.maxNumber / 2)); }
			},
			{
				c: function() { var r = randNum(100); return r <= 45 && r >= 35; },
				f: function(a, b) { return ((a % 5 == 0) && (b % 5 == 0)); }
			}
		];

		for (;;) {
			newNum.num1 = randNum(mainDiff.maxNumber);
			newNum.num2 = randNum(mainDiff.maxNumber);
			if ((newNum.num1 == 0) || (newNum.num2 == 0))
				continue;
			var met = 0;
			var needMeet = 0;
			for (var i = 0; i < checks.length; i++) {
				if (checks[i].c()) {
					needMeet++;
					if (checks[i].f(newNum.num1, newNum.num2)) {
						met++;
					}
				}
			}
			if (met == needMeet)
				break;
		}


	} else {
		/* If helper is off, none of those chances happen. */
		for (;;) {
			newNum.num1 = randNum(mainDiff.maxNumber);
			newNum.num2 = randNum(mainDiff.maxNumber);
			if ((newNum.num1 == 0) || (newNum.num2 == 0))
				continue;
			else
				break;
		}
	}

	for (;;) {
		newNum.op = (function() {
			switch (randNum(4)) {
				case 0:
					return "+";
					break;
				case 1:
					return "-";
					break;
				case 2:
					return "*";
					break;
				case 3:
					return "/";
					break;
			}
		}());

		if (!(mainDiff.ops.includes(newNum.op)))
			continue;

		if ((newNum.op === "/") && (newNum.num1 % newNum.num2 !== 0))
			continue;
		else
			break;
	}

	switch (newNum.op) {
		case "+":
			newNum.res = newNum.num1 + newNum.num2;
			break;
		case "-":
			newNum.res = newNum.num1 - newNum.num2;
			break;
		case "*":
			newNum.res = newNum.num1 * newNum.num2;
			break;
		case "/":
			newNum.res = newNum.num1 / newNum.num2;
			break;
	}

	for (;;) {
		if (newNum.res < 0 && mainDiff.allowNegatives == false) {
			newNum = generateNumber();
		} else {
			break;
		}
	}

	return newNum;
}

function refreshScore() {
	el_stats.innerHTML = "Correct: " + correct + " / Failed: " + failed;
}

function backSpace() {
	if (answer == 0)
		return;

	if (answer.toString.length != 1) {
		if (answer.toString()[0] == "-" && answer.toString().length == 2) {
			toggleNegative();
			answer = 0;
			el_answer.innerHTML = "";
			return;
		}

		answer = parseInt(answer.toString().slice(0, -1));
		el_answer.innerHTML = answer;

	} else {
		answer = 0;
		el_answer.innerHTML = "";
	}
}

function startGame() {
	document.body.onkeydown = function(e) {
		if (e.keyCode == 13) {
			submitResult();
		} else if ((e.keyCode >= 48 && e.keyCode <= 57)) {
			appendResult(parseInt(String.fromCharCode(e.keyCode)));
		} else if (e.keyCode == 8) {
			backSpace();
		} else if (e.keyCode == 189 || e.keyCode == 84) {
			toggleNegative();
		} else if (e.keyCode >= 96 && e.keyCode <= 105) {
            appendResult(e.keyCode - 96);
		}
	};

	el_gameSetup.style.display = "none";
	el_customSetup.style.display = "none";
	el_gameWindow.style.display = "block";

	resetCounter();
	operation = generateNumber();
	refreshGameWindow();

	console.log("Game started");
}

function refreshGameWindow() {
	answer = 0;
	el_operation.innerHTML = operation.num1 + " " + operation.op + " " + operation.num2
	el_answer.innerHTML = "";
	el_progressBar.style.width = "100%";
	el_btnNeg.innerHTML = "-";
}

function raiseCustomStartError(s) {
	el_customSetupErrorText.innerHTML = s;
	el_customSetup.style.display = "none";
	el_customSetupError.style.display = "block";
}

function customSetupErrorQuit() {
	el_customSetup.style.display = "block";
	el_customSetupError.style.display = "none";
}

function customStart() {
	var newDiff = {};

	newDiff.maxNumber = parseInt(el_gameSetupMax.value);
	newDiff.time = parseInt(el_gameSetupTime.value);

	if (newDiff.maxNumber == 0 || newDiff.time == 0) {
		raiseCustomStartError("Values cannot be 0");
		return;
	}

	if (isNaN(newDiff.maxNumber) || isNaN(newDiff.time)) {
		raiseCustomStartError("Values have to be numbers");
		return;
	}

	newDiff.ops = [];
	newDiff.helper = false;
	newDiff.allowNegatives = false;

	var op1 = el_btn1.getAttribute("data-state");
	var op2 = el_btn2.getAttribute("data-state");
	var op3 = el_btn3.getAttribute("data-state");
	var op4 = el_btn4.getAttribute("data-state");
	var helper = el_gameSetupHelper.getAttribute("data-state");
	var negatives = el_gameSetupNegatives.getAttribute("data-state");

	if (op1 == "enabled") newDiff.ops.push('+')
	if (op2 == "enabled") newDiff.ops.push('-')
	if (op3 == "enabled") newDiff.ops.push('*')
	if (op4 == "enabled") newDiff.ops.push('/')

	if (helper == "enabled") newDiff.helper = true;
	if (negatives == "enabled")	newDiff.allowNegatives = true;

	mainDiff = newDiff;
	startGame();
}

function tutorial() {
	el_gameSetup.style.display = "none";
	el_gameTutorial.style.display = "block";
}

function quitTutorial() {
	el_gameSetup.style.display = "block";
	el_gameTutorial.style.display = "none";
}

function setupCustom() {
	el_gameSetup.style.display = "none";
	el_customSetup.style.display = "block";
}

function gameSetup(dif) {
	switch (dif) {
		case 'easy':
			mainDiff = difficulties.easy;
			startGame();
			break;
		case 'medium':
			mainDiff = difficulties.medium;
			startGame();
			break;
		case 'hard':
			mainDiff = difficulties.hard;
			startGame();
			break;
		case 'custom':
			setupCustom();
			break;
	}
}

function customSetupToggleOp(op) {
	var el;
	switch (op) {
		case '+':
			el = el_btn1;
			break;
		case '-':
			el = el_btn2;
			break;
		case '*':
			el = el_btn3;
			break;
		case '/':
			el = el_btn4;
			break;
	}

	var state = el.getAttribute("data-state");
	if (state == "enabled")
		el.setAttribute("data-state", "disabled");
	else if (state == "disabled")
		el.setAttribute("data-state", "enabled")
}

function customSetupToggleHelper() {
	var el = el_gameSetupHelper;
	var state = el.getAttribute("data-state");
	if (state == "enabled") {
		el.setAttribute("data-state", "disabled");
		el.innerHTML = "Disabled";
	} else if (state == "disabled") {
		el.setAttribute("data-state", "enabled")
		el.innerHTML = "Enabled";
	}
}

function customSetupToggleNegatives() {
	var el = el_gameSetupNegatives;
	var state = el.getAttribute("data-state");
	if (state == "enabled") {
		el.setAttribute("data-state", "disabled");
		el.innerHTML = "Disabled";
	} else if (state == "disabled") {
		el.setAttribute("data-state", "enabled")
		el.innerHTML = "Enabled";
	}
}

function resetCounter() {
	clearInterval(timer.i);
	timer.time = 0;
	timer.i = setInterval(function() {
		timer.time++;
		if (timer.time === (mainDiff.time + 1)) {
			submitResult();
		} else {
			el_progressBar.style.width = 100 - (100 / mainDiff.time * timer.time) + "%";
		}
	}, 1000);
}

function randNum(m) {
	return Math.floor(Math.random() * m);
}
