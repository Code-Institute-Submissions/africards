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
            game.clickHandler();
        },

        clickHandler: function() {
            if ($(".card").hasClass("unmatched")) {
                $('.unmatched').click(function() {
                    $(this).addClass("visible");
                    console.log($(this).data('cardValue'));
                    if (game.firstCard.length === 0) {
                        game.firstCard = [];
                        game.firstCard.push($(this).data('cardValue'));
                        $(this).addClass("checkForMatch");
                    } else if (game.firstCard.length >= 1 && game.secondCard.length === 0){
                        game.secondCard = [];
                        game.secondCard.push($(this).data('cardValue'));
                        $(this).addClass("checkForMatch");
                        game.checkMatch();
                    };
                    console.log(game.firstCard, game.secondCard);
                });
            };
        },

        checkMatch: function() {
            if (game.firstCard[0] === game.secondCard[0]) {
                $(".visible").addClass("matched").removeClass("unmatched").removeClass("checkForMatch");
                game.firstCard = [];
                game.secondCard = [];
            } else {
                setTimeout(function() {
                    $(".unmatched").removeClass("visible").removeClass("checkForMatch");
                }, 500)
                game.firstCard = [];
                game.secondCard = [];
            };
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
