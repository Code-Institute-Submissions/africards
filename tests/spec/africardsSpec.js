    beforeEach(function() {
        jasmine.clock().install();
    });
    afterEach(function() {
        jasmine.clock().uninstall();
    });


// 1. movesCount Function
    describe("Check that two card flips equate to one move", function() {
        beforeEach(function() {
            countMoves = function(flipCount, movesCount) { 
                flipCount % 2 === 0;
                return movesCount + 1; 
            }
        });
        it("should add 1 more count to movesCount", function() {
        var flipCount = 16;
        var movesCount = 7;
        expect(countMoves(flipCount, movesCount)).toEqual(8);
        });      
    });

// 2. Timer Levels
    describe("Check that when a level button is pressed", function() {
        beforeEach(function() {
            loadTimer = function(difficulty) {
                switch (difficulty) {
                    case 'easy':
                        return easyTimer;
                    case 'medium':
                        return mediumTimer;
                    case 'hard':
                        return hardTimer;
                }
            }
        });

        it("should load correct time", function() {
            var easyTimer = 90;
            var mediumTimer = 60;
            var hardTimer = 30;
            var difficulty = 'hard';
            expect(loadTimer(difficulty)).toEqual(30);
        });

    });

        // 3. Shuffle Method
    describe("Check that array shuffling method", function() {
        beforeEach(function() {
            shuffleDeck = function(cards) {        
                for (i = 0; i < cards.length; i++) {
                    random = Math.round(Math.random() * i);
                    temp = cards[i];
                    cards[i] = cards[random];
                    cards[random] = temp;
                }
                return cards;
            }
        })
        it("should return a shuffled array", function() {
            var random = 0;
            var temp = 0;
            var i = 2;
            cards = [1, 2, 3, 4, 5, 6];
            expect(shuffleDeck(cards)).not.toEqual([1, 2, 3, 4, 5, 6]);
        })
    })
