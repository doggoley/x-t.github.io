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
    <p class="c">My archive of his work and photos is in the other tab.</p>
    <p class="c">Light a candle in his honor.</p>
    `;
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
            for (var i = 0; i < this.tabs.length; i++) this.tabs[i].setAttribute("class", "tab");
            this.tabs[t - 1].setAttribute("class", "tab tabSelected");
        }
    },
    selectTab: function(t) {
        this.clearContent();
        this.activeTab = t;
        switch (t) {
            case 1:
                this.aboutContent.style.display = "block";
                break;
            case 2:
                this.contactContent.style.display = "block";
                break;
            case 3:
                this.workContent.style.display = "block";
                break;
            case 4:
                this.otherContent.style.display = "block";
                break;
        }
        this.updateActiveTab(t);
    },
    clearContent: function() {
        eventSpace.style.display = "none";
        this.aboutContent.style.display = "none";
        this.contactContent.style.display = "none";
        this.workContent.style.display = "none";
        this.otherContent.style.display = "none";
    },
    init: function() {
        this.tabs[0].onclick = () => {th.selectTab(1)};
        this.tabs[1].onclick = () => {th.selectTab(2)};
        this.tabs[2].onclick = () => {th.selectTab(3)};
        this.tabs[3].onclick = () => {th.selectTab(4)};
        this.updateActiveTab(this.activeTab);
        if (this.activeTab != 0) this.aboutContent.style.display = "block";
    }
}

th.init();
