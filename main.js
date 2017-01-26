(function() {
    var DISCO_PALETTE = [
        [  7, 148, 202], // blue
        [226,  31, 149], // purple
        [249, 124,  57], // orange
        [254, 224,  76], // yellow
        [124, 210, 109]  // green
    ];

    var colorState = {
        srcIndex: null,
        destIndex: null
    };

    var targets = document.querySelectorAll('a');

    function random_int(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function choose_next_color() {
        colorState.srcIndex = colorState.destIndex;

        // Choose which direction to go around the palette circle
        var delta;
        if (random_int(0, 1) === 0) {
            delta = -1;
        } else {
            delta = 1;
        }

        // Get the index of the color in the direction we chose
        colorState.destIndex = colorState.srcIndex + delta;

        // Wrap around the palette circle
        if (colorState.destIndex < 0) {
            colorState.destIndex = DISCO_PALETTE.length - 1;
        } else if (colorState.destIndex > DISCO_PALETTE.length - 1) {
            colorState.destIndex = 0;
        }
    }

    function change_color() {
        // Get the current RGB values based on destIndex
        var rgb = {};
        for (var i = 0; i < 3; i++) {
            rgb[i] = DISCO_PALETTE[colorState.destIndex][i];
        }

        // Set the color and border-color of the targets
        var color = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        for (i = 0; i < targets.length; i++) {
            var target = targets[i];
            target.style.color = color;
            target.style.borderColor = color;
        }
    }

    function on_fade_finished() {
        choose_next_color();
        change_color();
    }

    function init() {
        // Choose a random color to start
        colorState.srcIndex = random_int(0, DISCO_PALETTE.length - 1);

        // Listen for the end of the color-change transition
        targets[0].addEventListener('transitionend', on_fade_finished, false);

        // Trigger the first color-change
        window.setTimeout(on_fade_finished, 100);
    }

    // Run
    init();
})();
