// Game Variables

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

var secondsLeftDisplay = $("#seconds");
var movesCount = 0;

var userCountry = localStorage.getItem("userCountry");
var userName = localStorage.getItem("userName");


$(document).ready(function() {

    /* The following code allows user information from the modal to be displayed on the page for a more personalised experience.
    The user is also required to select a country to visit which will tailor the game cards to the country.*/










    function checkUserData() {
        if ((userCountry === null) || (userCountry === "") || (userName === "")) {
            // Taken from https://stackoverflow.com/questions/22207377/disable-click-outside-of-bootstrap-modal-area-to-close-modal
            $("#userProfileModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        } else {
            userName = localStorage.getItem("userName");
            userCountry = localStorage.getItem("userCountry");
        }
        setupUser(userCountry, userName);
    }
    checkUserData();


    function setupUser(userCountry, userName) {
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

    /* Shuffle method */
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


    function loadTimer() {
        $('#easy-level').click(function() {
            difficulty = 'easy';
            secondsLeftDisplay.text(easyTimer);
        });
        $('#medium-level').click(function() {
            difficulty = 'medium';
            secondsLeftDisplay.text(mediumTimer);
        });
        $('#hard-level').click(function() {
            difficulty = 'hard';
            secondsLeftDisplay.text(hardTimer);
        });
    };
    loadTimer();

    function hardCountDownTimer() {
        deactivatedMode()
        var timer = setInterval(function() {
            if (hardTimer <= 1) {
                clearInterval(timer);
                $("#game-over-text").addClass("visible");
                resetGame();
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
                resetGame();
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
                resetGame();
            } else {
                easyTimer--;
                secondsLeftDisplay.text(easyTimer);
            };
        }, 1000);
        secondsLeftDisplay.text(easyTimer);
    }

    function assignDeck() {
        $('.card').each(function(index) {
            $(this).attr('data-card-value', cards[index].no);
        });
        $('.card-front-image').each(function(index) {
            $(this).attr('src', 'assets/images/' + userCountry + '/' + cards[index].img);
        });
        clickHandler();
    }

    function clickHandler() {
        $(".overlay-text-small").click(function() {
            $("#game-over-text").removeClass("visible");
        });

        $('#save-button').on('click', function() {

            // Consider using 'Switch Case' instead?
            let userName = $('#userName').val();
            let userCountry = $('#inputCountry').val();

            localStorage.setItem("userCountry", userCountry);
            localStorage.setItem("userName", userName);
            setupUser(userCountry, userName);

            $('#userProfileModal').modal('hide');
        });

        $('body').delegate('.unmatched', "click", function() {
            $(this).addClass("visible");
            if (firstCard.length === 0) {
                firstCard = [];
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
            $(".visible").addClass("matched").removeClass("unmatched").removeClass("checkForMatch");
            firstCard = [];
            secondCard = [];
        } else {
            setTimeout(function() {
                $(".checkForMatch").removeClass("visible").removeClass("checkForMatch").addClass('unmatched');
                firstCard = [];
                secondCard = [];
            }, 500)
        };
        gameWin();
    }

    function gameWin() {
        if ($('.unmatched').length === 0) {
            clearInterval(timer);
            setTimeout(function() {
                $("#victory-text").addClass("visible");
            }, 500);
        }
        resetGame();
    }

    function resetGame() {
        $(".overlay-text-small").click(function() {
            clearInterval(timer);
            $('.card').removeClass('visible matched').addClass('unmatched');
            $("button").prop("disabled", false).removeClass('deactivatedMode');
            return false;
            secondsLeftDisplay.text();
            $('#moves').text(0)
            $('.overlay-text').removeClass('visible');
        });
    }

    function deactivatedMode() {
        //Disables buttons
        $("button").prop("disabled", true).addClass('deactivatedMode');
        return true;
    }


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
