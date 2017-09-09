var timer = 10;
var correct = 0;


$(document).ready(function() {
    $("#sbutton").on("click", function () {
    //    Hide Start button after it has been clicked
        document.getElementById("sbutton").style.display = "none";

    //    Create elements here to display Time, Questions, and Answers
    //    Element for timer
        document.getElementById("timer").style.display = "inline";
        $("#timer").append(timer + " seconds left");
    //    Element for question ************************************************
        $("#question").append();
    //    Choices
        $("#choices").append();


    })



});

