window.onload = function() {
    var showQuake = document.getElementById('overlayQuakeShow');
    var overQuake = document.getElementById('overlayQuake');

    showQuake.onclick = function() {
        overlayQuake.style.display = 'block';
    };

    window.onclick = function(event) {
        if (event.target == overlayQuake) {
            overlayQuake.style.display = 'none';
        }
    };
};