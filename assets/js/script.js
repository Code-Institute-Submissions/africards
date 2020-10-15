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
var hardTimer = 10;

var difficulty = 'easy';

var timer;
var defaultLevelTime;

var secondsLeftDisplay = $("#seconds");
var movesCount = 0;

var userCountry = localStorage.getItem("userCountry");
var userName = localStorage.getItem("userName");

/* ----------------------------------------------------------------- List of Game Play functions */

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
            $('#user-country-pic').attr('src', 'assets/images/flags/south-africa.png');
            $('.card-back-image').attr('src', 'assets/images/flags/south-africa.png');
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
            $(this).attr('data-card-value', cards[index].no);
        });
        $('.card-front-image').each(function(index) {
            $(this).attr('src', 'assets/images/' + userCountry + '/' + cards[index].img);
        });
        loadTimer();
        clickHandlers();
    }

    /* ------------------------------------------------------------- Click Handlers */

    function clickHandlers() {
        $('#save-button').on('click', function() {
            let userName = $('#userName').val();
            let userCountry = $('#inputCountry').val();

            localStorage.setItem("userCountry", userCountry);
            localStorage.setItem("userName", userName);
            setUpUser(userCountry, userName);

            $('#userProfileModal').modal('hide');
        });

        $('body').delegate('.unmatched', "click", function() { // This line allows only the cards with the unmatched class to be selected. If matched, the function does not apply.
            $(this).addClass("visible");
            if (firstCard.length === 0) {
                firstCard.push($(this).data('cardValue'));
                $(this).addClass("checkForMatch").removeClass('unmatched');
            } else if (firstCard.length >= 1 && secondCard.length === 0){
                secondCard.push($(this).data('cardValue'));
                $(this).addClass("checkForMatch").removeClass('unmatched');
                movesCount++;
                $('#moves').text(movesCount);
                checkMatch();
            };
            if (movesCount === 0) {
                switch (difficulty) {
                    case 'easy': easyCountDownTimer();
                    break;
                    case 'medium': mediumCountDownTimer();
                    break;
                    case 'hard': hardCountDownTimer();
                    break;
                }
            }
        });
    }

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
        gameWin();
    }

    function gameWin() {
        if ($('.unmatched').length === 0) {
            setTimeout(function() {
                $("#victory-text").addClass("visible");
            }, 500);
        }
        clearInterval(timer);
        resetGame();
    }

    function resetGame() {
        $(".overlay-text-small").click(function() {
            // timer;
            $('.card').removeClass('visible matched checkForMatch').addClass('unmatched');
            $(".level-container button").prop("disabled", false).removeClass('deactivatedMode');
            // return false;
            loadTimer();
            console.log(defaultLevelTime);
            secondsLeftDisplay.text(defaultLevelTime);
            difficulty;
            shuffleDeck();
            movesCount = 0;
            $('#moves').text(movesCount);
            $('.overlay-text').removeClass('visible');
            firstCard = [];
            secondCard = [];
            $('.level-selector overlay-text').addClass('visible');
        });
    }

    function loadTimer() {
        $('#easy-level').click(function() {
            difficulty = 'easy';
            let defaultLevelTime = secondsLeftDisplay.text(easyTimer);
            defaultLevelTime;
        });
        $('#medium-level').click(function() {
            difficulty = 'medium';
            let defaultLevelTime = secondsLeftDisplay.text(mediumTimer);
            defaultLevelTime;
        });
        $('#hard-level').click(function() {
            difficulty = 'hard';
            let defaultLevelTime = secondsLeftDisplay.text(hardTimer);
            defaultLevelTime;
        });
    };

    function hardCountDownTimer() {
        deactivatedMode()
        var timer = setInterval(function() {
            if (hardTimer <= 1) {
                clearInterval(timer);
                $("#game-over-text").addClass("visible");
            } else {
                hardTimer--;
                secondsLeftDisplay.text(hardTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(hardTimer);
    }

    function mediumCountDownTimer() {
        deactivatedMode()
        var timer = setInterval(function() {
            if (mediumTimer <= 1) {
                clearInterval(timer);
                $("#game-over-text").addClass("visible");
            } else {
                mediumTimer--;
                secondsLeftDisplay.text(mediumTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(mediumTimer);
    }

    function easyCountDownTimer() {
        deactivatedMode()
        var timer = setInterval(function() {
            if (easyTimer <= 1) {
                clearInterval(timer);
                $("#game-over-text").addClass("visible");
            } else {
                easyTimer--;
                secondsLeftDisplay.text(easyTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(easyTimer);
    }

    function deactivatedMode() {
        //Disables buttons
        $(".level-container button").prop("disabled", true).addClass('deactivatedMode');
        return true;
    }

    // function newCountdown() {
    //     var timer = setInterval(function() {
    //         if ($('#seconds') <= 1) {
    //             clearInterval(timer);
    //             $("#game-over-text").addClass("visible");
    //             resetGame();
    //         } else {
    //             $('#seconds')--;
    //             secondsLeftDisplay.text($('#seconds'));
    //         };
    //     }, 1000);
    //     secondsLeftDisplay.text($('#seconds'));
    // }


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
