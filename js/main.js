'use strict';

(function() {
    var DISCO_PALETTE = [
        [  7, 148, 202], // blue
        [226,  31, 149], // purple
        [249, 124,  57], // orange
        [254, 224,  76], // yellow
        [124, 210, 109]  // green
    ];

    function random_int(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    class ColorShifter {
        constructor(target) {
            this.target = target;
            this.srcIndex = null;
            this.destIndex = null;

            // Choose a random color to start
            this.srcIndex = random_int(0, DISCO_PALETTE.length - 1);

            // Listen for the end of the color-change transition
            this.target.addEventListener(
                'transitionend',
                this.on_fade_finished.bind(this),
                false
            );

            // Trigger the first color-change
            setTimeout(this.on_fade_finished.bind(this), 100);
            //document.addEventListener(
            //    'DOMContentLoaded',
            //    this.on_fade_finished.bind(this),
            //    false
            //);
        }

        choose_next_color() {
            this.srcIndex = this.destIndex;

            // Choose which direction to go around the palette circle
            var delta;
            if (random_int(0, 1) === 0) {
                delta = -1;
            } else {
                delta = 1;
            }

            // Get the index of the color in the direction we chose
            this.destIndex = this.srcIndex + delta;

            // Wrap around the palette circle
            if (this.destIndex < 0) {
                this.destIndex = DISCO_PALETTE.length - 1;
            } else if (this.destIndex > DISCO_PALETTE.length - 1) {
                this.destIndex = 0;
            }
        }

        change_color() {
            // Get the current RGB values based on destIndex
            var rgb = {};
            for (var i = 0; i < 3; i++) {
                rgb[i] = DISCO_PALETTE[this.destIndex][i];
            }

            // Set the background-color of the target
            var color = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            this.target.style.backgroundColor = color;
        }

        on_fade_finished() {
            this.choose_next_color();
            this.change_color();
        };
    }

    function init() {
        var targets = document.getElementsByTagName('a');
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            new ColorShifter(target);
        }
    }

    // Run
    init();
})();
