/***
This is a game about finding the lighter color in squares of similar colors.
***/
    "use strict";
(function() {
    var Game = {
        numRows: 2,
        numColumns: 2,
        gridNum: 6,
        heightSquare: 250;

        // functions
        init: function() {
            this.startTimer();
            this.gameLoop();
        }
        gameLoop: function() {
            $('.start').fadeOut('slow');
            $('.center').html("");
            this.createRowsandColumns(numRows, numColumns, gridNum, heightSquare);
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
                increaseScore();
            }
        }

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
        }
        increaseScore: function() {
                var gameScore = $('.score').text();
                gameScore = parseInt(gameScore);
                gameScore++;
                $('.score').text(gameScore);
            }
            // create rows and columns
        createRowsandColumns: function(numRows, numColumns, gridNum, heightSquare) {
                var ranColor = this.randomLighterColor(lightenColor(Game.randomColor(), 0.3));
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
                return ranColor;
            }
            // returns random color
        randomColor: function() {
                return '#' + Math.random().toString(16).slice(2, 8);
            }
            // lighten color
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
            }
            // create random lighter color
        randomLighterColor: function(lighterColor) {
            var paras = $('.same-color');
            var rand = Math.floor(Math.random() * paras.length);
            paras.eq(rand).addClass('diff');
            $('.diff').css('background-color', lighterColor);
        }
    }
})();
