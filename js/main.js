// Events

var date = new Date();
var m = date.getMonth();
var d = date.getDate();
var y = date.getFullYear();

var eventSpace = document.getElementById("eventSpace");

function loadScript(script) {
    var newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.src = script;
    document.body.appendChild(newScript);
}

// Snow

if ((m === 12 && d >= 20) || (m === 1 && d >= 5))
    loadScript("js/snow.min.js");

// Christmas

if ((m == 12 && (d == 25 || d == 26))) {
    var eventText = '<br><h1 class="c"><i class="fas fa-gift"></i> Happy Holidays! <i class="fas fa-gift"></i></h1>';
    eventSpace.innerHTML = eventText;
}

// New Year

if (m == 1 && (d >= 1 && d <= 5)) {
    var eventText = '<br><h1 class="c"><i class="fas fa-glass-cheers"></i> Happy New Year! <i class="fas fa-glass-cheers"></i></h1>';
    eventSpace.innerHTML = eventText;
}

// Terry

if (m == 8 && (d >= 11 && d <= 18)) {
    var eventText = '';
    eventText += '<br>';
    eventText += '<h1 class="c"><i class="fas fa-cross"></i></h1>';
    eventText += '<h2 class="c">RIP Terry Andrew Davis</h2>';
    eventText += '<p class="c">August 11 marks the ' + (y - 2018) + ' year of his passing.</p>';
    eventText += '<p class="c">My archive of his work and photos is in the other tab.</p>';
    eventText += '<p class="c">Light a candle in his honor.</p>';
    
    eventSpace.innerHTML = eventText;
}

// Tab handler
var th = {
    tabs: [
        document.getElementById("tab1"), // About
        document.getElementById("tab2"), // Contact
        document.getElementById("tab3"), // Work
        document.getElementById("tab4") // Other
    ],
    aboutContent: document.getElementById("aboutContent"),
    contactContent: document.getElementById("contactContent"),
    workContent: document.getElementById("workContent"),
    otherContent: document.getElementById("otherContent"),
    activeTab: (function() {
        return eventSpace.innerHTML == "" ? 1 : 0;
    })(),
    updateActiveTab: function(t) {
        if (t != 0) {
            for (var i = 0; i < th.tabs.length; i++) th.tabs[i].setAttribute("class", "tab");
            th.tabs[t - 1].setAttribute("class", "tab tabSelected");
        }
    },
    selectTab: function(t) {
        th.clearContent();
        th.activeTab = t;
        switch (t) {
            case 1:
                th.aboutContent.style.display = "block";
                break;
            case 2:
                th.contactContent.style.display = "block";
                break;
            case 3:
                th.workContent.style.display = "block";
                break;
            case 4:
                th.otherContent.style.display = "block";
                break;
        }
        th.updateActiveTab(t);
    },
    clearContent: function() {
        eventSpace.style.display = "none";
        th.aboutContent.style.display = "none";
        th.contactContent.style.display = "none";
        th.workContent.style.display = "none";
        th.otherContent.style.display = "none";
    },
    init: function() {
        th.tabs[0].onclick = function(){th.selectTab(1)};
        th.tabs[1].onclick = function(){th.selectTab(2)};
        th.tabs[2].onclick = function(){th.selectTab(3)};
        th.tabs[3].onclick = function(){th.selectTab(4)};
        th.updateActiveTab(th.activeTab);
        if (th.activeTab != 0) th.aboutContent.style.display = "block";
    }
}

th.init();
