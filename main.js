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
        destIndex: null,
        percent: 0
    };

    function random_int(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function shift_color() {
        if (colorState.destIndex === null) {
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

            // Start at 0% fade
            colorState.percent = 0;
        }

        // Get the current RGB values based on the fade percent
        var rgb = {};
        for (var i = 0; i < 3; i++) {
            var src = DISCO_PALETTE[colorState.srcIndex][i];
            var dest = DISCO_PALETTE[colorState.destIndex][i];
            var percent = colorState.percent;

            rgb[i] = Math.floor(src + (percent * (dest - src)));
        }

        // Set the background color
        document.body.style.backgroundColor = 'rgb('
            + rgb[0] + ','
            + rgb[1] + ','
            + rgb[2] + ')';

        // Increment the fade percent
        var changeDelta = .005;
        colorState.percent += changeDelta;

        // If we have reached the destination color
        if (colorState.percent >= 1) {
            colorState.srcIndex = colorState.destIndex;
            colorState.destIndex = null;
        }
    }

    function init() {
        // Choose a random color to start
        colorState.srcIndex = random_int(0, DISCO_PALETTE.length - 1);

        window.setInterval(shift_color, 33);
    }

    // Run
    init();
})();
