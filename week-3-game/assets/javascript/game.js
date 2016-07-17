var wins = 1;
var losses = 0;
var misses = 5;

var teamList = {
    // List of answers/ teams
    teams: ['Steelers', 'Ravens', 'Chargers', 'Patriots',
             'Cowboys', 'Dolphins', 'Titans', 'Bears',
             'Saints', 'Bills', 'Falcons', 'Broncos',
             'Seahawks', 'Lions', 'Buccaneers', 'Texans'],

    // This part checks to see if the user has won
    checkStatus: function() {
        var a = blanks.indexOf("_");
        if (a < 0) {
            wins++;
            document.getElementById("wins").innerHTML = "Wins: " + wins;
            alert("Congrats, " + cpuTeam + " was the correct team!")
            teamList.resetGame();
        }
    },

    //updating the underscores 
    newWord: function() {
        showAnswer = "";
        for (var i = 0; i < cpuTeam.length; i++) {
            showAnswer += blanks[i] + " ";
        }
        console.log(showAnswer);
        document.getElementById("word").innerHTML = showAnswer.replace('&nbsp');
    },

    //this function will be restarting the game once a decision of a lost or win is given
    resetGame: function() {
        misses = 5;
        document.getElementById('guesses').innerHTML = "Number of Guesses Left: " + misses;
        cpuTeam = teamList.teams[Math.floor(Math.random() * teamList.teams.length)].toUpperCase();
        console.log(cpuTeam);
        guessed = [];
        document.getElementById('letters').innerHTML = "Letters guessed: " + guessed;
        blanks = [];
        for (var i = 0; i < cpuTeam.length; i++) {
            if (cpuTeam[i] == " ") {
                blanks.push("^");
            } else {
                blanks.push("_");
            }
        }
        teamList.newWord();
    },
};

// Randomly selecting which team the computer will use
var cpuTeam = teamList.teams[Math.floor(Math.random() * teamList.teams.length)].toUpperCase();
console.log(cpuTeam);

var blanks = [];
var guessed = [];

// this puts all the underscores there basically making an empty array
for (var i = 0; i < cpuTeam.length; i++) {
    if (cpuTeam[i] == " ") {
        blanks.push("^");
    } else {
        blanks.push("_");
    }
}
teamList.newWord();

// user keystroke executing function
document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode);
    document.getElementById('start').style.display = 'none'
    if (guessed.includes(userGuess)) {
        //don't do anything
    } else {
        guessed.push(userGuess)
        document.getElementById('letters').innerHTML = "Letters guessed: " + guessed.join(", ");
        if (cpuTeam.includes(userGuess)) {
            var guessToChar = userGuess.charAt(0);
            var missTracker = 0;
            //check to see if the key was a hit
            for (var k = 0; k < cpuTeam.length; k++) {
                if (cpuTeam[k] == guessToChar) {
                    missTracker = 100;
                    blanks[k] = guessToChar;
                    teamList.newWord();
                }
            }
        } else {
            misses--;
            misstracker = 0;
            if (misses == 0) {
                losses++;
                document.getElementById('losses').innerHTML = "Losses: " + losses;
                alert("You lose! The correct team was: " + cpuTeam);
                teamList.resetGame();
            }
            document.getElementById('guesses').innerHTML = "Number of Guesses Left: " + misses;
        }
    }
    teamList.checkStatus();
}
