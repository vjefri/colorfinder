/***
This is a game about finding the lighter color in squares of similar colors.
***/
(function() {

    var findColor = {
        gameLoop: function() {

            var numRows = 2;
            var numColumns = 2;
            var gridNum = 6;
            var heightSquare = 250;
            // click handlers for the start buttons
            $('.start').fadeOut('slow');
            $('.center').html("");
            $(document).on("click", ".diff", function(){
                findColor.rightChoice(numRows, numColumns, gridNum, heightSquare);
            });


            // if they click on diff, change row and column values

            var ranColor = this.randomColor();

            // create rows and columns with a similar random color
            this.createRowsandColumns(numRows, numColumns, gridNum, heightSquare, ranColor);

            // assign a random color to the grid
            this.randomLighterColor(this.lightenColor(ranColor, .05));
        },

        // changes rows and columns of game by making more
        rightChoice: function(numRows, numColumns, gridNum, heightSquare) {
            if (numRows >= 4) {
                numRows = 6;
                numColumns = 6;
                gridNum = 2;
                heightSquare = 500 / 6;
            } else {
                // increment values
                numRows++;
                numColumns++;
                gridNum = 12 / numColumns;
                heightSquare = 500 / numColumns;
            }
            if (numRows > 3) {
                this.increaseScore();
            }
        },

        // start game timer
        startTimer: function() {
            var sec = $('.timer').text();
            var timer = setInterval(function() {
                $('.timer').text(--sec);
                if (sec < 10) {
                    $('.timer').css('color', "#e74c3c");
                }
                if (sec === 0) {
                    $('.center .row').remove();
                    $('.timer').fadeOut('slow');
                    $('.timer').text('Play again in 5 sec');
                    $('.timer').fadeIn('slow');
                    clearInterval(timer);
                    setTimeout(
                        function() {
                            location.reload();
                        }, 5000);
                }
            }, 1000);
        },

        // increase game score
        increaseScore: function() {
            var gameScore = $('.score').text();
            gameScore = parseInt(gameScore);
            gameScore++;
            $('.score').text(gameScore);
        },

        // create rows and columns and assigns them a similar random color
        createRowsandColumns: function(numRows, numColumns, gridNum, heightSquare, ranColor) {

            for (var i = 1; i <= numRows; i++) {

                $(".center").append('<div class="row row' + i + '">');
                // style the rows
                $('.row row' + i).css({
                    'padding': '5px',
                    'padding-left': '20px',
                    'padding-right': '20px',
                });

                for (var j = 1; j <= numColumns; j++) {
                    var selectCell = ".same-color";
                    var selectRow = ".row" + i;
                    // add cells to rows
                    $(selectRow).append('<div class="col-md-' + gridNum + ' same-color"> </div>');

                    // style cells
                    $(selectCell).css({
                        'background-color': ranColor,
                        'height': heightSquare + 'px',
                        'border': '10px solid #ecf0f1',
                        'border-radius': '25px',
                    });
                }
            }

            $(".center").append("</div>");
        },

        // returns random color using hex number
        randomColor: function() {
            return '#' + Math.random().toString(16).slice(2, 8);
        },

        // lighten color, by passing in the hex number and luminosity param
        lightenColor: function(hex, lum) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            lum = lum || 0;
            // convert to decimal and change luminosity
            var rgb = "#",
                c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }
            return rgb;
        },

        // create random lighter color
        randomLighterColor: function(lighterColor) {
            var paras = $('.same-color');
            var rand = Math.floor(Math.random() * paras.length);
            paras.eq(rand).addClass('diff');
            $('.diff').css('background-color', lighterColor);
        },

        // initiate game
        init: function() {
            this.gameLoop();
            this.startTimer();
        }
    };

    // play the game
    $(".start").on('click', function() {
        findColor.init();
    });
})();
