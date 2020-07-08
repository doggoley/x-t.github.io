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

// Events

var date = new Date();
var m = date.getMonth();
var d = date.getDate();
var y = date.getFullYear();

var eventSpace = document.getElementById("eventSpace");

// Christmas

if ((m == 12 && (d == 25 || d == 26))) {
    var eventText = `<br><h1 class="c"><i class="fas fa-gift"></i> Happy Holidays! <i class="fas fa-gift"></i></h1>`;
    eventSpace.innerHTML = eventText;
}

// New Year

if (m == 1 && (d >= 1 && d <= 5)) {
    var eventText = `<br><h1 class="c"><i class="fas fa-glass-cheers"></i> Happy New Year! <i class="fas fa-glass-cheers"></i></h1>`;
    eventSpace.innerHTML = eventText;
}

// Terry

if (m == 8 && (d >= 11 && d <= 18)) {
    var yearPass = y - 2018;
    var eventText = `
    <br>
    <h1 class="c"><i class="fas fa-cross"></i></h1>
    <h2 class="c">RIP Terry Andrew Davis</h2>
    <p class="c">August 11 marks the ${yearPass} year of his passing.</p>
    <p class="c">My archive of his work and photos is at the bottom.</p>
    <p class="c">Light a candle in his honor.</p>
    `;
    eventSpace.innerHTML = eventText;
}


