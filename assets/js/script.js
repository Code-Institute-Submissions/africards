/* ----------------------------------------------------------------- List of Global Variables */

var cards = [
    {
        img: "one.jpg",
        no: 1
    },
    {
        img: "one.jpg",
        no: 1
    },
    {
        img: "two.jpg",
        no: 2
    },
    {
        img: "two.jpg",
        no: 2
    },
    {
        img: "three.jpg",
        no: 3
    },
    {
        img: "three.jpg",
        no: 3
    },
    {
        img: "four.jpg",
        no: 4
    },
    {
        img: "four.jpg",
        no: 4
    },
    {
        img: "five.jpg",
        no: 5
    },
    {
        img: "five.jpg",
        no: 5
    },
    {
        img: "six.jpg",
        no: 6
    },
    {
        img: "six.jpg",
        no: 6
    },
    {
        img: "seven.jpg",
        no: 7
    },
    {
        img: "seven.jpg",
        no: 7
    },
    {
        img: "eight.jpg",
        no: 8
    },
    {
        img: "eight.jpg",
        no: 8
    }
];

var firstCard = [];
var secondCard = [];

var easyTimer = 90;
var mediumTimer = 60;
var hardTimer = 8;

var difficulty = 'easy';

var timer;
var defaultLevelTime;

var secondsLeftDisplay = $("#seconds");
var turns = 0;
var movesCounted = 0;
var flipCount = 0;

var userCountry = localStorage.getItem("userCountry");
var userName = localStorage.getItem("userName");

/* ----------------------------------------------------------------- List of Game Play Functions */

$(document).ready(function() {

    /* ------------------------------------------------------------- Checking User Data */

    /* The following code allows user information from the modal
    to be displayed on the page for a more personalised experience.*/

    function checkUserData() {
        if ((userCountry === null) || (userCountry === "") || (userName === "")) {
            $("#userProfileModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        } else {
            userName = localStorage.getItem("userName");
            userCountry = localStorage.getItem("userCountry");
        }
        setUpUser(userCountry, userName);
    }
    checkUserData();

    /* ------------------------------------------------------------- Setting Up User Profile */

    /*The user is required to select a country to visit which
    will tailor the game cards to the country. For example, if user
    selects "Nigeria", the game cards will have the Nigerian flag on
    the back face and cultural images on the front face.*/

    function setUpUser(userCountry, userName) {
        $('#user-name').text(userName);
        $('#user-country').text("Welcome" + " To " + userCountry + "!");

        if (userCountry === 'south-africa') {
            $('#user-country-pic').attr('src', 'assets/images/flags/south-africa.png'); // Changes the flag picture underneath the "Hi + userNeme"
            $('.card-back-image').attr('src', 'assets/images/flags/south-africa.png'); // Changes the flag picture on the back of the cards
        } else if (userCountry === 'ethiopia') {
            $('#user-country-pic').attr('src', 'assets/images/flags/ethiopia.png');
            $('.card-back-image').attr('src', 'assets/images/flags/ethiopia.png');
        } else if (userCountry === 'ghana') {
            $('#user-country-pic').attr('src', 'assets/images/flags/ghana.png');
            $('.card-back-image').attr('src', 'assets/images/flags/ghana.png');
        } else if (userCountry === 'kenya') {
            $('#user-country-pic').attr('src', 'assets/images/flags/kenya.png');
            $('.card-back-image').attr('src', 'assets/images/flags/kenya.png');
        } else if (userCountry === 'morocco') {
            $('#user-country-pic').attr('src', 'assets/images/flags/morocco.png');
            $('.card-back-image').attr('src', 'assets/images/flags/morocco.png');
        } else if (userCountry === 'nigeria') {
            $('#user-country-pic').attr('src', 'assets/images/flags/nigeria.png');
            $('.card-back-image').attr('src', 'assets/images/flags/nigeria.png');
        };
        shuffleDeck();
    }

    /* ------------------------------------------------------------- Shuffling of Card Deck */

    /* This shuffle method creates a loop for numbers starting
    from the first index i.e. i=0. The maximum value of i will
    be 15 (which will be the last index of the cards array). It
    creates a random value between 0 and 15 inclusive for each
    index in the cards array. It then rounds them and reassigns them back
    to the array; the result is that the indices have now changed values.*/

    function shuffleDeck() {
        var random = 0;
        var temp = 0;
        var i = 0;
        for (i; i < cards.length; i++) {
            random = Math.round(Math.random() * i);
            temp = cards[i];
            cards[i] = cards[random];
            cards[random] = temp;
        }
        assignDeck();
    }

    /* ------------------------------------------------------------- Assigning Card Deck */

    /* This function assigns the shuffled card images to their
    corresponding new indices. For the matching mechanism, a
    'data-card-value' attribute has been created. This will match
    the image name. For example, where the image is 'one.jpg', the
    'data-card-value' of this card would be 1.*/

    function assignDeck() {
        $('.card').each(function(index) {
            $(this).attr('data-card-value', cards[index].no); // Changes the data card value number to match the names of the photos e.g. image one.jpg has data-card-value = 1.
        });
        // debugger;
        $('.card-front-image').each(function(index) {
            $(this).attr('src', 'assets/images/' + userCountry + '/' + cards[index].img); // Changes images on the card's front to those of the user's chosen country.
        });
        loadTimer();
        clickHandlers();
    }

    /* ------------------------------------------------------------- Click Handlers */

    /* These click handlers cover:
    - The event that the user clicks the save button in the '#userProfileModal'.
    - The event that the user clicks the cards.
    - The type of timer run once user clicks their first card.
    (This is dependent on the value of the 'difficulty' variable; which
    by default is set to 'easy'). */

    function clickHandlers() {
        $('#save-button').on('click', function() { // This code is for the User Profile Modal. It handles the event after clicking "save".
                // debugger;
            let userName = $('#userName').val();
            let userCountry = $('#inputCountry').val();

            localStorage.setItem("userCountry", userCountry);
            localStorage.setItem("userName", userName);
            location.reload();
            setUpUser(userCountry, userName);
            // debugger;
            $('#userProfileModal').modal('hide');
        });
        

        /* This code allows only the cards with the unmatched class
        to be selected. If matched, the function does not apply.*/
        $('body').delegate('.unmatched', "click", function() {
            $(this).addClass("visible");
            if (firstCard.length === 0) {
                firstCard.push($(this).data('cardValue'));
                // flipCount++;
                $(this).addClass("checkForMatch").removeClass('unmatched'); // Adding a temporary class 'checkForMatch' which will be removed once another card is picked.
            } else if (firstCard.length >= 1 && secondCard.length === 0){ // Once the firstCard.length is more than 1, the value of the next card will be pushed to secondCard.
                secondCard.push($(this).data('cardValue'));
                // flipCount++;
                $(this).addClass("checkForMatch").removeClass('unmatched'); // Adding a temporary class 'checkForMatch' to check value with other checkForMatch card.
                checkMatch();
            } else {
                return false;
            };

            if ((turns === 0) && (secondCard.length === 0)) { // BUG FIX: Needed to make sure that array of secondCard is also empty so that this function is not running twice on second card flip.
                switch (difficulty) {
                    case 'easy': easyCountDownTimer();
                    break;
                    case 'medium': mediumCountDownTimer();
                    break;
                    case 'hard': hardCountDownTimer();
                    break;
                    default: return false;
                }
                return difficulty;  
            }
        });
    }

    /* ------------------------------------------------------------- Checking Cards for Match */

    /* This function checks that the value in the firstCard array
    is identical to the value in the secondCard array. If so, then
    the 'matched' class is added and the array is reset to empty. If not
    identical, then the card is flipped back by removing the 'visible' class
    and remains unmatched*/

    function checkMatch() {
        if (firstCard[0] === secondCard[0]) {
            $(".visible").addClass("matched").removeClass("unmatched checkForMatch");
            firstCard = [];
            secondCard = [];
        } else {
            setTimeout(function() {
                $(".checkForMatch").removeClass("visible checkForMatch").addClass('unmatched');
                firstCard = [];
                secondCard = [];
            }, 500)
        };
        countMoves();
        gameWin();
    }

    /* ------------------------------------------------------------- User Winning the Game */

    /* This function loads a screen-wide element with class 'overlay-text'
    Timer will stop counting down.*/

    function gameWin() {
        if ($('.unmatched').length === 0) {
            clearInterval(timer);
            setTimeout(function() {
                $("#victory-text").addClass("visible");
            }, 500);
        } else {
            return false;
        }
    }

    function gameOver() {
        clearInterval(timer);
        $("#game-over-text").addClass("visible");
    }


    /* ------------------------------------------------------------- Counting the User's Moves */

    /* When the user flips 2 cards, this equates to 1 move.*/

    function countMoves() {
        movesCounted = turns;
        if ((flipCount) % 2 === 0) {
            turns++;
        } else {
            return false;
        }
        $('#moves').text(turns);
    }

    /* ------------------------------------------------------------- Resetting the Game */

    /* All classes are reset and the user will have to choose a level to
    restart the game in. */
    
    function reset() {
        location.reload(true);
    }

    $('.gameReset').click(function(){
        reset();
    });

    /* ------------------------------------------------------------- Loading the Timer */

    /* Depending on which level the user clicks, the game script will
    run one of those within the loadTimer() function. */

    function loadTimer() {
        $('#easy-level').click(function() {
            difficulty = 'easy';
            var defaultLevelTime = secondsLeftDisplay.text(easyTimer);
            defaultLevelTime;
            $('#easy-level').addClass('pressed');
            $('#medium-level').removeClass('pressed');
            $('#hard-level').removeClass('pressed');
        });
        $('#medium-level').click(function() {
            difficulty = 'medium';
            var defaultLevelTime = secondsLeftDisplay.text(mediumTimer);
            defaultLevelTime;
            $('#easy-level').removeClass('pressed');
            $('#medium-level').addClass('pressed');
            $('#hard-level').removeClass('pressed');
        });
        $('#hard-level').click(function() {
            difficulty = 'hard';
            var defaultLevelTime = secondsLeftDisplay.text(hardTimer);
            defaultLevelTime;
            $('#easy-level').removeClass('pressed');
            $('#medium-level').removeClass('pressed');
            $('#hard-level').addClass('pressed');
        });
    };

    /* ------------------------------------------------------------- Running the Timer */

    /* Bug fix resulted in separating the countdowns into 3 types.
    These correspond to the levels and the function called depends
    on the level that the user selects. */

    function hardCountDownTimer() {
        hardDeactivatedMode()
        timer = setInterval(function() {
            if (hardTimer <= 1) {
                gameOver();
            } else {
                hardTimer--;
                secondsLeftDisplay.text(hardTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(hardTimer);
    }

    function mediumCountDownTimer() {
        mediumDeactivatedMode()
        timer = setInterval(function() {
            if (mediumTimer <= 1) {
                gameOver();
            } else {
                mediumTimer--;
                secondsLeftDisplay.text(mediumTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(mediumTimer);
        return false;
    }

    function easyCountDownTimer() {
        easyDeactivatedMode()
        timer = setInterval(function() {
            if (easyTimer <= 1) {
                gameOver();
            } else {
                easyTimer--;
                secondsLeftDisplay.text(easyTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(easyTimer);
        return false;
    }

    /* ------------------------------------------------------------- Deactivation Mode */

    /* As the timer counts down, the user will be unable to change
    levels mid-game. */

    function easyDeactivatedMode() {
    //Disables buttons
    $("#easy-level").prop("disabled", true);
    $("#medium-level").prop("disabled", true).addClass('deactivatedMode');
    $("#hard-level").prop("disabled", true).addClass('deactivatedMode');
    return true;
    }

    function mediumDeactivatedMode() {
    //Disables buttons
    $("#easy-level").prop("disabled", true).addClass('deactivatedMode');
    $("#medium-level").prop("disabled", true);
    $("#hard-level").prop("disabled", true).addClass('deactivatedMode');
    return true;
    }

    function hardDeactivatedMode() {
    //Disables buttons
    $("#easy-level").prop("disabled", true).addClass('deactivatedMode');
    $("#medium-level").prop("disabled", true).addClass('deactivatedMode');
    $("#hard-level").prop("disabled", true);
    return true;
    }


    /* ------------------------------------------------------------- Light / Dark Modes */

    /* Function for the Light-Dark Theme Toggle */
    $("#theme-toggle").click(function() {
        var lightDarkSwitch = $("#stylesheet");
        if (lightDarkSwitch.attr("href") == "assets/css/style.css") {
            lightDarkSwitch.attr("href", "assets/css/style-dark.css");
        }  else {
            lightDarkSwitch.attr("href", "assets/css/style.css");
        }
    });
})
