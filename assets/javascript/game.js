//Crystal Collector Game 
//global variables 
var randomResult;
var loss = 0;
var win = 0;
var totalScore;
var previous = 0;

//reset function that will reset the random number chosen,and the crystals numerical values 
var gameStartReset = function () {

    $(".crystals").empty();

    // array of crystal images
    var images = [
        'https://i.postimg.cc/gxhd9FHx/blue.jpg',
        'https://i.postimg.cc/DWKhnjxB/green.jpg',
        'https://i.postimg.cc/vgYd61Fn/pink.jpg',
        'https://i.postimg.cc/LqBpXt7R/purple.jpg'
    ];

    //computer picks a random result every time between  19 and 120 
    randomResult = Math.floor(Math.random() * 101) + 19;

    $("#result").html('Random Result: ' + randomResult);

    //Every crystal needs to have a random number between 1-12 
    //this loop generates 4 chrystals all in seperate divs with values between 1-12
    for (var i = 0; i < 4; i++) {
        var random = Math.floor(Math.random() * 11) + 1;
        console.log(random)

        //selects div class 'crystals' and creates 4 new divs(each names crystal) within the .crystals div
        var crystal = $("<div>");
        crystal.attr({
            "class": 'crystal',
            "data-random": random
        });

        ///puts crystal images into  div 
        crystal.css({
            "background-image": "url('" + images[i] + "')",
            "background-size": "cover"
        });

        $(".crystals").append(crystal);
    }

    $("#current-total").html(previous);
}
gameStartReset();

//When clicking any crystal, it should be adding with previous value until it reaches total score 
//functions that allows user to be able to click crystal image to figure out hidden value
$(document).on('click', ".crystal", function () {

    var crystNum = parseInt($(this).attr('data-random'));

    previous += crystNum;

    $("#current-total").html(previous);

    // if it is greater  than  random result, user gets loss. add 1 to loss counter 
    if (previous > randomResult) {

        loss++;

        $("#loss").html(loss);

        previous = 0;

        gameStartReset();
    } 
    //if user guesses values correctly, win counter increases by 1
    else if (previous === randomResult) {

        win++;

        $("#win").html(win);

        previous = 0;

        gameStartReset();
    }
});