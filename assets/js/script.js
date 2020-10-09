// Game Variables

const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];


var timer = 5;
var secondsLeftDisplay = $("#timer");
var moves = 0;

let userName = localStorage.getItem("userName");
let userCountry = localStorage.getItem("userCountry");


$(document).ready(function() {

    /* The following code allows user information from the modal to be displayed on the page for a more personalised experience.
    The user is also required to select a country to visit which will tailor the game cards to the country.*/

    $('#save').on('click', function() {
      $('#user-name').text("Hi, " + $('#userName').val());
      $('#userCountry').text("Welcome" + " To " + $('#inputCountry').val() + "!");
      if ($('#inputCountry').val() === 'South Africa') {
          $('#user-country-pic').attr('src', 'assets/images/flags/south-africa.png');
      }
      if ($('#inputCountry').val() === 'Ethiopia') {
          $('#user-country-pic').attr('src', 'assets/images/flags/ethiopia.png');
      }
      if ($('#inputCountry').val() === 'Ghana') {
          $('#user-country-pic').attr('src', 'assets/images/flags/ghana.png');
      }
      if ($('#inputCountry').val() === 'Kenya') {
          $('#user-country-pic').attr('src', 'assets/images/flags/kenya.png');
      }
      if ($('#inputCountry').val() === 'Morocco') {
          $('#user-country-pic').attr('src', 'assets/images/flags/morocco.png');
      }
      if ($('#inputCountry').val() === 'Nigeria') {
          $('#user-country-pic').attr('src', 'assets/images/flags/nigeria.png');
      }
    });

// Game Initialisation

    var game = {

        firstCard: [],
        secondCard: [],

        init: function() {
            game.assignDeck();
            // game.reload();
        },

        reload: function() {
            countdown = function() {
                if (timer <= 1) {
                    clearInterval(timer);
                    $("#game-over-text").addClass("visible");
                } else {
                    timer--;
                    secondsLeftDisplay.text(timer);
                    $("#game-over-text").removeClass("visible");
                };
            };


            secondsLeftDisplay.text(timer);
            setInterval(countdown, 1000);
        },

        assignDeck: function() {
            $('.card').each(function(index) {
                $(this).attr('data-card-value', cards[index]);
            });
            game.clickHandler();
        },

        clickHandler: function() {
            $(".overlay-text-small").click(function() {
                $("#game-over-text").removeClass("visible");
                timer = 5;
                countdown();
                secondsLeftDisplay.text(timer);
            });


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
