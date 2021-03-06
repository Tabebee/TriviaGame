
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
// $(images).addClass('center-block');

var wrongIMG = ["<img src='assets/images/wrong.png' class='center-block'>"];
var timeoutimg =  ["<img src='assets/images/timeout.jpg' class='center-block'>"];

var start;
var game;
var timer = 10;
var QCount = 0;
var clock;
var correct = 0;
var wrong = 0;
var wrongTimeout = 0;
var clickSound = new Audio("assets/javascript/Click.mp3"); // Click
var correctSound = new Audio("assets/javascript/Right.mp3");   // Correct audio
var wrongSound = new Audio("assets/javascript/Wrong.mp3");   //  Laugh
var timeoutSound = new Audio("assets/javascript/whawha.mp3");  //wha wha wha
var song = new Audio("assets/javascript/Jackson5IWantYouBack.mp3"); //I want you back



$(document).ready(function() {

    // alert("TURN UP YO VOLUME!");

    function firstpg() {
        start = "<p class='text-center main-button-container'><a class='btn btn-success btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(start);
    }

    firstpg();
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault(); 
        clickSound.play();
        createHTML();

        timerfunc();

    });

    $("body").on("click", ".answer", function(event){
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[QCount]) {
            clearInterval(clock);
            ifWin();
        }
        else {
            clearInterval(clock);
            ifLoss();
        }
    });

    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        reset();
    });

});

function timeoutLoss() {
    wrongTimeout++;
    game =  "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" +
            "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[QCount] + "</p>" +
            timeoutimg;
    $(".mainArea").html(game);
    setTimeout(wait, 4000);
    timeoutSound.play();
}

function ifWin() {
    correct++;
    game =  "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" +
            "<p class='text-center'>Correct! The answer is: " + correctAnswers[QCount] + "</p>" + images[QCount];
    $(".mainArea").html(game);
    setTimeout(wait, 4000);
    correctSound.play();
}

function ifLoss() {
    wrong++;
    game =  "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" +
            "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[QCount] + "</p>" + wrongIMG;
    $(".mainArea").html(game);
    setTimeout(wait, 4000);
    wrongSound.play();
}

function createHTML() {
    game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" +
            questionArray[QCount] + "</p><p class='first-answer answer'>A. " + answerArray[QCount][0] +
            "</p><p class='answer'>B. "+ answerArray[QCount][1] + "</p><p class='answer'>C. " + answerArray[QCount][2] +
            "</p><p class='answer'>D. "+ answerArray[QCount][3] + "</p>";
    $(".mainArea").html(game);
}

function wait() {
    if (QCount < 9) {
        QCount++;
        createHTML();
        timer = 10;
        timerfunc();
    }
    else {
        lastpg();
    }
}

function timerfunc() {
    clock = setInterval(tenSeconds, 1000);
    function tenSeconds() {
        if (timer === 0) {
            clearInterval(clock);
            timeoutLoss();
        }
        if (timer > 0) {
            timer--;
        }
        $(".timer").html(timer);
    }
}

function lastpg() {
    game =  "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" +
            "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " +
            correct + "</p>" + "<p>Wrong Answers: " + wrong + "</p>" + "<p>Unanswered: " + wrongTimeout + "</p>" +
            "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(game);
    song.play();
}

function reset() {
    QCount = 0;
    correct = 0;
    wrong = 0;
    wrongTimeout = 0;
    timer = 10;
    createHTML();
    timerfunc();
    song.pause();
}



alert("TURN UP YO VOLUME!");
