// Randomized background

var bgs = JSON.parse(`[
    "back_blue.png",
    "back_purple.png",
    "back_red.png",
    "back_xp.jpg",
    "back_car.jpg",
    "back_old.jpg",
    "back_may.png",
    "back_elon.jpg",
    "back_sl_server.jpeg"
]`);
var r = Math.floor(Math.random() * bgs.length);
var bg = document.getElementById("bg");
bg.style.backgroundImage = "url('" + "bgs/" + bgs[r] + "')";