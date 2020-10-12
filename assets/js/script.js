// Game Variables

var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

var firstCard = [];
var secondCard = [];

var easyTimer = 90;
var mediumTimer = 60;
var hardTimer = 30;

var secondsLeftDisplay = $("#seconds");
var moves = 0;

var userCountry = localStorage.getItem("userCountry");
var userName = localStorage.getItem("userName");


$(document).ready(function() {

    /* The following code allows user information from the modal to be displayed on the page for a more personalised experience.
    The user is also required to select a country to visit which will tailor the game cards to the country.*/

    function checkUserData() {
        if ((userCountry.val() === null) || (userCountry.val() === "") || (userName.val() === "")) {
            // Taken from https://stackoverflow.com/questions/22207377/disable-click-outside-of-bootstrap-modal-area-to-close-modal
            userCountry = localStorage.getItem("userCountry");
            userName = localStorage.getItem("userName");
            $("#userProfileModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        } else {
            userName = localStorage.getItem("userName");
            userCountry = localStorage.getItem("userCountry");

        }
        userCountry = localStorage.setItem("userCountry", userCountry.val());
        userName = localStorage.setItem("userName", userName.val());
    }
    // Deactivate Level Buttons while game plays

    // function deactivateLevelButtons() {
    //     if (hardTimer) {
    //         setTimeout(function() {
    //             $('#easyLevel').addClass("deactivatedMode").removeClass("level button:hover");
    //             $('#mediumLevel').addClass("deactivatedMode").removeClass("level button:hover");
    //         }, 3000);
    //     } else if (mediumTimer) {
    //         setTimeout(function() {
    //             $('#easyLevel').addClass("deactivatedMode").removeClass("level button:hover");
    //             $('#hardLevel').addClass("deactivatedMode").removeClass("level button:hover");
    //         }, 6000)
    //     } else {
    //         setTimeout(function() {
    //             $('#easyLevel').addClass("deactivatedMode").removeClass("level button:hover");
    //             $('#mediumLevel').addClass("deactivatedMode").removeClass("level button:hover");
    //         }, 9000)
    //     };
    // }



    loadTimer();

    function loadTimer() {
        $('#easy-level').click(function() {
            secondsLeftDisplay.text(easyTimer);
            easyCountDownTimer();
        });
        $('#medium-level').click(function() {
            secondsLeftDisplay.text(mediumTimer);
            mediumCountDownTimer();
        });
        $('#hard-level').click(function() {
            secondsLeftDisplay.text(hardTimer);
            hardCountDownTimer();
        });
        assignDeck();
    };


    function hardCountDownTimer() {
        // if (hardTimer === secondsLeftDisplay.text(hardTimer)) {
        $('#play-button').click(function() {
            // deactivateLevelButtons();
            var timer = setInterval(function() {
                if (hardTimer <= 1) {
                    clearInterval();
                    $("#game-over-text").addClass("visible");
                } else {
                    hardTimer--;
                    secondsLeftDisplay.text(hardTimer);
                    $("#game-over-text").removeClass("visible");
                };
            }, 1000);
        });
        secondsLeftDisplay.text(hardTimer);
    }
    function mediumCountDownTimer() {

        // else if (mediumTimer === secondsLeftDisplay.text(mediumTimer)){
        $('#play-button').click(function() {
            // deactivateLevelButtons();
            var timer = setInterval(function() {
                if (mediumTimer <= 1) {
                    clearInterval();
                    $("#game-over-text").addClass("visible");
                } else {
                    mediumTimer--;
                    secondsLeftDisplay.text(mediumTimer);
                    $("#game-over-text").removeClass("visible");
                };
            }, 1000);
        });
        secondsLeftDisplay.text(mediumTimer);
    }

    function easyCountDownTimer() {
        // else {
        $('#play-button').click(function() {
            // deactivateLevelButtons();
            var timer = setInterval(function() {
                if (easyTimer <= 1) {
                    clearInterval();
                    $("#game-over-text").addClass("visible");
                } else {
                    easyTimer--;
                    secondsLeftDisplay.text(easyTimer);
                    $("#game-over-text").removeClass("visible");
                };
            }, 1000);
        });
        secondsLeftDisplay.text(easyTimer);
    }


function assignDeck() {
    $('.card').each(function(index) {
        $(this).attr('data-card-value', cards[index]);
    });
    clickHandler();
}

function clickHandler() {
    $(".overlay-text-small").click(function() {
        $("#game-over-text").removeClass("visible");
    });

    $('#save-button').on('click', function() {
        $('#user-name').text($('#userName').val());
        $('#user-country').text("Welcome" + " To " + $('#inputCountry').val() + "!");
        // Consider using 'Switch Case' instead?
        let userCountry = $('#inputCountry').val();
        if (userCountry === 'South Africa') {
            $('#user-country-pic').attr('src', 'assets/images/flags/south-africa.png');
            $('.card-back-image').attr('src', 'assets/images/flags/south-africa.png');
        } else if (userCountry === 'Ethiopia') {
            $('#user-country-pic').attr('src', 'assets/images/flags/ethiopia.png');
            $('.card-back-image').attr('src', 'assets/images/flags/ethiopia.png');
        } else if (userCountry === 'Ghana') {
            $('#user-country-pic').attr('src', 'assets/images/flags/ghana.png');
            $('.card-back-image').attr('src', 'assets/images/flags/ghana.png');
        } else if (userCountry === 'Kenya') {
            $('#user-country-pic').attr('src', 'assets/images/flags/kenya.png');
            $('.card-back-image').attr('src', 'assets/images/flags/kenya.png');
        } else if (userCountry === 'Morocco') {
            $('#user-country-pic').attr('src', 'assets/images/flags/morocco.png');
            $('.card-back-image').attr('src', 'assets/images/flags/morocco.png');
        } else if (userCountry === 'Nigeria') {
            $('#user-country-pic').attr('src', 'assets/images/flags/nigeria.png');
            $('.card-back-image').attr('src', 'assets/images/flags/nigeria.png');
        };
        userCountry = localStorage.setItem("userCountry", userCountry);
        userName = localStorage.setItem("userName", $('#userName').val());
    });


    if ($(".card").hasClass("unmatched")) {
        $('.unmatched').click(function() {
            $(this).addClass("visible");
            console.log($(this).data('cardValue'));
            if (firstCard.length === 0) {
                firstCard = [];
                firstCard.push($(this).data('cardValue'));
                $(this).addClass("checkForMatch");
            } else if (firstCard.length >= 1 && secondCard.length === 0){
                // secondCard = [];
                secondCard.push($(this).data('cardValue'));
                $(this).addClass("checkForMatch");
                checkMatch();
            };
            console.log(firstCard, secondCard);
        });
    };
}

function checkMatch() {
    if (firstCard[0] === secondCard[0]) {
        $(".visible").addClass("matched").removeClass("unmatched").removeClass("checkForMatch");
        firstCard = [];
        secondCard = [];
    } else {
        setTimeout(function() {
            $(".unmatched").removeClass("visible").removeClass("checkForMatch");
            firstCard = [];
            secondCard = [];
        }, 500)
    };
}
//     checkMatch: function() {
//     }


// Game Initialisation

// var game = {
//
//     firstCard: [],
//     secondCard: [],
//
//     init: function() {
//         game.assignDeck();
//         // game.shuffleDeck();
//     },
//
//     // shuffleDeck: function() { // Shuffles the deck of cards
//     //     var random = 0;
//     //     var temp = 0;
//     //     var i = 1;
//     //     for (i; i < cards.length; i++) {  // Need to check that this shuffle method is ok!!!
//     //         random = Math.round(Math.random() * i);
//     //         temp = cards[i];
//     //         cards[i] = cards[random];
//     //         cards[random] = temp;
//     //     }
//     //     game.assignDeck();
//     //     console.log('Shuffled Deck Array: ' + cards);
//     // },
//
//     assignDeck: function() {
//         $('.card').each(function(index) {
//             $(this).attr('data-card-value', cards[index]);
//         });
//         game.clickHandler();
//     },
//
//     clickHandler: function() {
//         $(".overlay-text-small").click(function() {
//             $("#game-over-text").removeClass("visible");
//             timer = 5;
//             countdown();
//             secondsLeftDisplay.text(timer);
//         });
//
//
//         if ($(".card").hasClass("unmatched")) {
//             $('.unmatched').click(function() {
//                 $(this).addClass("visible");
//                 console.log($(this).data('cardValue'));
//                 if (game.firstCard.length === 0) {
//                     game.firstCard = [];
//                     game.firstCard.push($(this).data('cardValue'));
//                     $(this).addClass("checkForMatch");
//                 } else if (game.firstCard.length >= 1 && game.secondCard.length === 0){
//                     game.secondCard = [];
//                     game.secondCard.push($(this).data('cardValue'));
//                     $(this).addClass("checkForMatch");
//                     game.checkMatch();
//                 };
//                 console.log(game.firstCard, game.secondCard);
//             });
//         };
//     },
//
//     checkMatch: function() {
//         if (game.firstCard[0] === game.secondCard[0]) {
//             $(".visible").addClass("matched").removeClass("unmatched").removeClass("checkForMatch");
//             game.firstCard = [];
//             game.secondCard = [];
//         } else {
//             setTimeout(function() {
//                 $(".unmatched").removeClass("visible").removeClass("checkForMatch");
//             }, 500)
//             game.firstCard = [];
//             game.secondCard = [];
//         };
//     }
// };





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

// game.init();

})
