// Game Variables

const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];


var easyTimer = 15;
var mediumTimer = 10;
var hardTimer = 5;

var secondsLeftDisplay = $("#timer");
var moves = 0;

var userName = localStorage.getItem("userName");
var userCountry = localStorage.getItem("userCountry");
var userCountryPic = localStorage.getItem("userCountryPic");


$(document).ready(function() {

    /* The following code allows user information from the modal to be displayed on the page for a more personalised experience.
    The user is also required to select a country to visit which will tailor the game cards to the country.*/

    function checkUserData() {
        if ((userCountry === null) || (userName === "")) {
            // Taken from https://stackoverflow.com/questions/22207377/disable-click-outside-of-bootstrap-modal-area-to-close-modal
            setTimeout(function() {
                $("#userProfileModal").modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }, 500);
        } else {
            userCountry = localStorage.setItem("userCountry");
            userName = localStorage.setItem("userName");
        }
    }


    $('#save-button').on('click', function() {

        // Consider using 'Switch Case' instead?

        $('#user-name').text("Hi, " + $('#userName').val());
        $('#userCountry').text("Welcome" + " To " + $('#inputCountry').val() + "!");

        let userCountry = $('#inputCountry').val();

        if (userCountry === 'South Africa') {
            // $('#user-country-pic').attr('src', 'assets/images/flags/south-africa.png');
            $('.card-back-image').attr('src', 'assets/images/flags/south-africa.png');
        } else if (userCountry === 'Ethiopia') {
            // $('#user-country-pic').attr('src', 'assets/images/flags/ethiopia.png');
            $('.card-back-image').attr('src', 'assets/images/flags/ethiopia.png');
        } else if (userCountry === 'Ghana') {
            // $('#user-country-pic').attr('src', 'assets/images/flags/ghana.png');
            $('.card-back-image').attr('src', 'assets/images/flags/ghana.png');
        } else if (userCountry === 'Kenya') {
            // $('#user-country-pic').attr('src', 'assets/images/flags/kenya.png');
            $('.card-back-image').attr('src', 'assets/images/flags/kenya.png');
        } else if (userCountry === 'Morocco') {
            // $('#user-country-pic').attr('src', 'assets/images/flags/morocco.png');
            $('.card-back-image').attr('src', 'assets/images/flags/morocco.png');
        } else if (userCountry === 'Nigeria') {
            // $('#user-country-pic').attr('src', 'assets/images/flags/nigeria.png');
            $('.card-back-image').attr('src', 'assets/images/flags/nigeria.png');
        };


    });




    // Game Initialisation

    var game = {

        firstCard: [],
        secondCard: [],

        init: function() {
            game.assignDeck();
            game.reload(90);
            game.play(timer);
        },

        reload: function(timer) {
            $('#easyLevel').click(function() {
                secondsLeftDisplay.text(90);
            });
            $('#mediumLevel').click(function() {
                secondsLeftDisplay.text(60);
            });
            $('#hardLevel').click(function() {
                secondsLeftDisplay.text(30);
            });
        },

        play: function() {
            $('#playButton').click(function() {
                countDown = function(timer) {
                    let timer = secondsLeftDisplay;
                    if (timer <= 1) {
                        clearInterval(timer);
                        $("#game-over-text").addClass("visible");
                    } else {
                        setInterval(function() {
                            timer--;
                        }, 1000)
                        secondsLeftDisplay.text(timer);
                        $("#game-over-text").removeClass("visible");
                    };
                };
            });

        },

        // countdown = function() {
        //     if (timer <= 1) {
        //         clearInterval(timer);
        //         $("#game-over-text").addClass("visible");
        //     } else {
        //         timer--;
        //         secondsLeftDisplay.text(timer);
        //         $("#game-over-text").removeClass("visible");
        //     };
        // };
        //
        //
        // secondsLeftDisplay.text(timer);
        // setInterval(countdown, 1000);
        // },

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
