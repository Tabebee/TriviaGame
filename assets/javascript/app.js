
var questionArray = ["What does S.H.I.E.L.D. stand for?",
                     "What group of villains is known as the masters of evil (first version)?",
                     "Who issued The Avengers Initiative?",
                     "The alter ego of this super hero is Lamont Cranston.",
                     "Hal Jordan is known as The Green Lantern.Who else has gone by that name?",
                     "Batman is to Gotham City as Superman is to _______?",
                     "What metal is bound into Wolverines bones?",
                     "What is the name of Thor's home Planet?",
"                    Who is the Doctor for the X-Men?" ,
                     "In the movie Anchorman, Ron Burgundy claims that this hero/villain was denied a bank loan."];

var answerArray = [ ["Strategic Homeland Intervention Enforcement Logistics Division", "Strategic Homeland Interception Enforcement Logistics Division", "Strategic Homeland Interception for Enforcement Logistics Division", "Strategic Homeland To Interpret and  Enforce Law Division"] ,
                    ["Doctor Octopus, Electro, Kraven the Hunter, Mysterio, Sandman, Vulture","Harley Quinn, Deadshot, El Diablo, Captain Boomerang, Rick Flag, Killer Croc","Enchantress, Dr. Doom, Ultron, Loki, Baron Mordo","Norman Osborn, Baron Zemo, Punisher, Loki, Ultron, Venom, Deadshot"] ,
                    ["Commander Maria Hill", "Director Amanda Waller", "Agent Phil Coulson", "S.H.I.E.L.D."],
                    ["Wolverine","The Shadow","The Thing","Hawkeye"],
                    ["Kyle Raynor", "Barry Allen", "Britt Reid", "Charles Xavier"],
                    ["Hell's Kitchen","Asgard","Star City","Metropolis"],
                    ["Vibranium", "Adamantium", "Adamantine", "Uru"],
                    ["Vanaheim", "Alfheim", "Asgard", "Midgard"],
                    ["Storm", "Jean Grey", "The Beast", "Iceman"],
                    ["The Human Torch","The Punisher","Mr Incredible","The Joker"]];

var correctAnswers = [  "A. Strategic Homeland Intervention Enforcement Logistics Division",
                        "C. Enchantress, Dr. Doom, Ultron, Loki, Baron Mordo",
                        "D. S.H.I.E.L.D.", "B. The Shadow", "A. Kyle Raynor", "D. Metropolis", "B. Adamantium", "C. Asgard",
                        "C. The Beast", "A. The Human Torch"];

var images = [  "<img src='assets/images/1Answer.jpg' class='center-block'>", "<img src='assets/images/2Answer.png' class='center-block'>",
                "<img src='assets/images/3Answer.jpg' class='center-block'>", "<img src='assets/images/4Answer.jpg' class='center-block'>",
                "<img src='assets/images/5Answer.jpg' class='center-block'>", "<img src='assets/images/6Answer.jpg' class='center-block'>",
                "<img src='assets/images/7Answer.jpg' class='center-block'>", "<img src='assets/images/8Answer.jpg' class='center-block'>",
                "<img src='assets/images/9Answer.jpg' class='center-block'>", "<img src='assets/images/10Answer.png' class='center-block'>"];
// $("img").addClass('center-block');

var start;
var game;
var timer = 99;
var questionCounter = 0;
var clock;
var correct = 0;
var wrong = 0;
var wrongTimeout = 0;
var sound1 = new Audio("assets/javascript/Click.mp3");
var sound2 = new Audio("assets/javascript/Right.mp3");   // Correct audio
var sound3 = new Audio("assets/javascript/Wrong.mp3");   // Evil Laugh



$(document).ready(function() {

    function initialScreen() {
        start = "<p class='text-center main-button-container'><a class='btn btn-success btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(start);
    }

    initialScreen();
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault(); 
        sound1.play();
        generateHTML();

        timerWrapper();

    });

    $("body").on("click", ".answer", function(event){
        sound1.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");

            clearInterval(clock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(clock);
            generateLoss();
        }
    });

    $("body").on("click", ".reset-button", function(event){
        sound1.play();
        resetGame();
    });

});

function generateLossDueToTimeOut() {
    wrongTimeout++;
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(game);
    setTimeout(wait, 4000);
}

function generateWin() {
    correct++;
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + images[questionCounter];  // + imageArray[questionCounter]
    $(".mainArea").html(game);
    setTimeout(wait, 4000);
    sound2.play();
}

function generateLoss() {
    wrong++;
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(game);
    setTimeout(wait, 4000);
    sound3.play();
}

function generateHTML() {
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>99</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $(".mainArea").html(game);
}

function wait() {
    if (questionCounter < 9) {
        questionCounter++;
        generateHTML();
        timer = 99;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    clock = setInterval(tenSeconds, 1000);
    function tenSeconds() {
        if (timer === 0) {
            clearInterval(clock);
            generateLossDueToTimeOut();
        }
        if (timer > 0) {
            timer--;
        }
        $(".timer").html(timer);
    }
}

function finalScreen() {
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" + "<p>Wrong Answers: " + wrong + "</p>" + "<p>Unanswered: " + wrongTimeout + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(game);
}

function resetGame() {
    questionCounter = 0;
    correct = 0;
    wrong = 0;
    wrongTimeout = 0;
    timer = 99;
    generateHTML();
    timerWrapper();
}
