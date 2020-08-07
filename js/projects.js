// Generating projects for PCs
var generated = false;
function generateDesktopRights() {
    var rights = document.getElementsByClassName("projectBox_rightMobile");
    for (var i = 0; i < rights.length; i++) {
        // Generate elements
        var boxRight = document.createElement("div");
        var centerCont = document.createElement("div");
        var link = document.createElement("a");
        var disc = document.createElement("div");
        var button = document.createElement("div");
        var buttonChild = document.createElement("div");
        
        // Give classes
        boxRight.setAttribute("class", "projectBox_right");
        centerCont.setAttribute("class", "c");
        disc.setAttribute("class", "projectBox_disclaimer");
        button.setAttribute("class", "projectBox_button");
        buttonChild.setAttribute("class", "projectBox_buttonChild");

        // Content
        buttonChild.innerHTML = '<i class="fas fa-arrow-right"></i>';
        disc.innerHTML = rights[i].getElementsByClassName("projectBox_disclaimer")[0].innerHTML;

        if (document.body.contains(rights[i].getElementsByTagName("a")[0])) {
            link.href = rights[i].getElementsByTagName("a")[0].getAttribute("href");
        } else {
            button.setAttribute("class", "projectBox_button redBtn");
            buttonChild.innerHTML = '<i class="fas fa-times"></i>';
        }

        // Construct
        boxRight.appendChild(centerCont);
        centerCont.appendChild(link);
        centerCont.appendChild(document.createElement("br"));
        centerCont.appendChild(disc);
        link.appendChild(button);
        button.appendChild(buttonChild);

        // Append
        rights[i].parentElement.appendChild(boxRight);
    }
}

function exec() {
    if (getComputedStyle(document.getElementsByClassName("projectBox_rightMobile")[0]).display == "none" && generated === false) {
        generateDesktopRights(); generated = true;
    }
}

exec();
document.body.onresize = exec;