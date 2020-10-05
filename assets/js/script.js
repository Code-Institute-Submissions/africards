// Game Variables

const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];


var hasFlippedCard = false;

let userName = localStorage.getItem("userName");
let userCountry = localStorage.getItem("userCountry");


$(document).ready(function() {

    var game = {

        firstCard: [],
        secondCard: [],

        init: function() {
            game.assignDeck();
        },

        assignDeck: function() {
            $('.card').each(function(index) {
                $(this).attr('data-card-value', cards[index]);
            });
            game.clickHandlers();
        },

        clickHandlers: function() {
            $('.card').click(function() {

                $(this).addClass("visible");
                console.log($(this).data('cardValue'));


                if (game.firstCard.length >= 0) {
                    game.firstCard = [];
                    game.firstCard.push($(this).data('cardValue'));
                } else {
                    game.secondCard = [];
                    game.secondCard.push($(this).data('cardValue'));
                };

                console.log(game.firstCard, game.secondCard);
            });
            // game.checkMatch();
        }
    };





    /** Function for the Light-Dark Theme Toggle **/
    $("#theme-toggle").click(function() {
        var lightDarkSwitch = $("#stylesheet");
        if (lightDarkSwitch.attr("href") == "assets/css/style.css") {
            lightDarkSwitch.attr("href", "assets/css/style-dark.css");
            console.log($("#stylesheet").attr("href"));
        }  else {
            lightDarkSwitch.attr("href", "assets/css/style.css");
            console.log($("#stylesheet").attr("href"));
        }
    });

    game.init();

})
