//array with objects containing questions/answers/correct answer 
var questions = [{
        question: 'What is the capital of Italy?',
        answers: ['Milan', 'Turin', 'Rome', 'Naples'],
        correctAnswer: 'Rome',
        image:  ''
    },

    {
        question: 'Who painted The Last Supper?',
        answers: ['Michaelangelo', 'Caravagio', 'Giotto', 'Leonardo da Vinci'],
        correctAnswer: 'Leonardo da Vinci',
        image: ''
    },

    {
        question: 'What was the name of the town destroyed by mount Vesuvius in 79AD?',
        answers: ['Pompei', 'Sorrento', 'Paestum', 'Agropoli'],
        correctAnswer: 'Pompei',
        image: '',
    },
    {
        question: 'What is the name of the church in the Vatican?',
        answers: ['St Pauls', 'St Marks', 'St Peters', 'St Johns'],
        correctAnswer: 'St Peters',
        image: '',
    },
    {
        question: 'Who painted the ceiling of the Sistine Chapel?',
        answers: ['Titian', 'Michaelangelo', 'Donatello', 'Raphael'],
        correctAnswer: 'Michaelangelo',
        image: '',
    },
    {
        question: 'Which roman emperor was assassinated on the Ides of March?',
        answers: ['Julius', 'Augustus', 'Nero', 'Octavius'],
        correctAnswer: 'Julius',
        image: '/images/ceasar.jpg'
    }
];

//global variable for
//wins/losses/unchosen answer
//timer 
//current question 
var wins = 0;
var losses = 0;
var notChosen = 0;
var number = 31;
var timeSpacer = 6;
var intervalId;
var currentQuestion = 0;

//waits until the document is ready to load
//hides the timer until start button is clicked
//hides the questions until start button is clicked 
$(document).ready(function () {
    $("#start").show();
    $("timer").hide();
    $("#question-answers").hide();
})

//end game function will show player how many answers they got right or wrong 
var endGame = function () {
    $("#question-answers").hide();
    $("timer").hide();
    $("#wins").text("Answered Correctly: " + wins);
    $("#losses").text("Answered Incorrectly: " + losses);
    $("#not-answered").text("Answered Not Chosen: " + notChosen);
}

//user clicks start button 
$("#start").on("click", function () {
    //hides start button once its been clicked 
    $('#start').attr("hidden", true);
    //timer and questions and answers shown
    $("timer").show();
    $("#question-answers").show();
    run();
    //calls function to show first question 
    setQuestion(currentQuestion);
});

//timer function - runs timer from 31 seconds down 
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

    //  Decrease seconds by 1 second 
    number--;

    //  Show the number in the #seconds-remaining in html.
    $("#seconds-remaining").html("Seconds Remaining: " + number);

    if (number === 0) {

        //if timer gets to 0, the next question will load 
        currentQuestion++;
        setQuestion(currentQuestion);

        number = 31;

        //increments not answered score by 1 
        notChosen++;
        // $("#result").text("Mi dispiace... You didnt choose an answer. The correct answer was " + questions[currentQuestion].correctAnswer);
    }
}




function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

//puts questions and answers into html placement 
var setQuestion = function (index) {
    $('#question').text(questions[index].question);
    $('#answer1').text(questions[index].answers[0]);
    $('#answer2').text(questions[index].answers[1]);
    $('#answer3').text(questions[index].answers[2]);
    $('#answer4').text(questions[index].answers[3]);

    //resets timer back to 31 
    number = 31;
}


//on  click function that  logs  whatever answer has been chosen 
$(".answer").on("click", function () {

    //this gets the text from the button clicked 
    $(this).text()

    //compares and increments answers correctly answered 
    if ($(this).text() === questions[currentQuestion].correctAnswer) {
        wins++;
        // $("#result").text("Bellissimo! You answered Correctly!");
        // $("#image").text('<img src=' + questions[currentQuestion].image + '/>');
    }

    //this works if you select the correct answer 
    
    //compares and increments answers not correctly answered  
    else {
        losses++;        
        // $("#result").text("Mi dispiace...  The correct answer was " + questions[currentQuestion].correctAnswer);
    }
    
    if (currentQuestion === 5) {
        $("#seconds-remaining").hide();

        endGame();
    }
    //moves on to the nest question 
    // setTimeout(2000);
    currentQuestion++;
    setQuestion(currentQuestion).delay( 800 );
});