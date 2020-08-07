// Randomized background
var _bgs = '[';
_bgs += '"back_blue.png",';
_bgs += '"back_purple.png",';
_bgs += '"back_red.png",';
_bgs += '"back_xp.jpg",';
_bgs += '"back_car.jpg",';
_bgs += '"back_old.jpg",';
_bgs += '"back_may.png",';
_bgs += '"back_elon.jpg",';
_bgs += '"back_sl_server.jpeg"]';
var bgs = JSON.parse(_bgs);
var r = Math.floor(Math.random() * bgs.length);
var bg = document.getElementById("bg");
bg.style.backgroundImage = "url('" + "bgs/" + bgs[r] + "')";