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
var hardTimer = 30;

var difficulty = 'easy';

var secondsLeftDisplay = $("#seconds");
var movesCount = 0;

var userCountry = localStorage.getItem("userCountry");
var userName = localStorage.getItem("userName");


$(document).ready(function() {

    /* The following code allows user information from the modal to be displayed on the page for a more personalised experience.
    The user is also required to select a country to visit which will tailor the game cards to the country.*/

    /* Shuffle method */
    function shuffleDeck() {
        var random = 0;
        var temp = 0;
        var i = 0;
        console.log('Unshuffled Deck Array: ' + cards);
        for (i; i < cards.length; i++) {
            random = Math.round(Math.random() * i);
            temp = cards[i];
            cards[i] = cards[random];
            cards[random] = temp;
        }
        assignDeck();
        console.log('Shuffled Deck Array: ' + cards);
    };
    shuffleDeck();








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
        console.log(userCountry, userName);
        setupUser(userCountry, userName);
    }
    checkUserData();


    function setupUser(userCountry, userName) {
        $('#user-name').text(userName);
        $('#user-country').text("Welcome" + " To " + userCountry + "!");

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
            $('.card-front-image').attr('src',function(index,attr){
                return attr.replace('south-africa','kenya');
            });
        } else if (userCountry === 'Morocco') {
            $('#user-country-pic').attr('src', 'assets/images/flags/morocco.png');
            $('.card-back-image').attr('src', 'assets/images/flags/morocco.png');
        } else if (userCountry === 'Nigeria') {
            $('#user-country-pic').attr('src', 'assets/images/flags/nigeria.png');
            $('.card-back-image').attr('src', 'assets/images/flags/nigeria.png');
            $('.card-front-image').attr('src',function(index,attr){
                return attr.replace('south-africa','nigeria');
            });
        };
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
        // if (hardTimer === secondsLeftDisplay.text(hardTimer)) {
        $('#play-button').click(function() {
            deactivatedMode()
            var timer = setInterval(function() {
                if (hardTimer <= 1) {
                    clearInterval();
                    $("#game-over-text").addClass("visible");
                    resetGame();
                } else {
                    hardTimer--;
                    secondsLeftDisplay.text(hardTimer);
                };
            }, 1000);
        });
        secondsLeftDisplay.text(hardTimer);
    }
    function mediumCountDownTimer() {

        // else if (mediumTimer === secondsLeftDisplay.text(mediumTimer)){
        $('#play-button').click(function() {
            deactivatedMode()
            var timer = setInterval(function() {
                if (mediumTimer <= 1) {
                    clearInterval();
                    $("#game-over-text").addClass("visible");
                    resetGame();
                } else {
                    mediumTimer--;
                    secondsLeftDisplay.text(mediumTimer);
                };
            }, 1000);
        });
        secondsLeftDisplay.text(mediumTimer);
    }

    function easyCountDownTimer() {
        // else {
        $('#play-button').click(function() {
            deactivatedMode()
            var timer = setInterval(function() {
                if (easyTimer <= 1) {
                    clearInterval();
                    $("#game-over-text").addClass("visible");
                    resetGame();
                } else {
                    easyTimer--;
                    secondsLeftDisplay.text(easyTimer);
                };
            }, 1000);
        });
        secondsLeftDisplay.text(easyTimer);
    }


    function assignDeck() {
        $('.card').each(function(index) {
            $(this).attr('data-card-value', cards[index].no);
        });
        $('.card-front-image').each(function(index) {
            $(this).attr('src', 'assets/images/' + userCountry + '/' + cards[index].img);
            console.log(this);
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
                    movesCount++;
                    $('#moves').text(movesCount)
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
        checkWin();
    }

    function checkWin() {
        if ($('.unmatched').length === 0) {
            setTimeout(function() {
                $("#victory-text").addClass("visible");
                resetGame();
            }, 500);
        }
    }

    function resetGame() {
        $(".overlay-text-small").click(function() {
            clearInterval();
            $('.card').removeClass('visible matched deactivatedMode').addClass('unmatched');
            secondsLeftDisplay.text();
            movesCount = 0;
            $('#moves').text(movesCount)
            $('.overlay-text').removeClass('visible');
        });

    }

    function deactivatedMode() {
        //Disables buttons
        $("button").prop("disabled", true).addClass('deactivatedMode');
        return true;
    }


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

})
