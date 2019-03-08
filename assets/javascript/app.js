//create an array of strings 
var topics = ['angry', ' bored', ' disappointed', ' drunk', ' embarassed', ' excited', ' frustrated', ' happy', ' hungry', ' inpsired', ' lonely', ' love', ' nervous', ' relaxed', ' sad', ' sassy', ' scared', ' shocked', ' sick', ' tired'];

//function that creates buttons
function buttons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var newButtons = $("<button>");
        newButtons.text(topics[i]);
        newButtons.addClass("clickMeForGif")
        $("#buttons").append(newButtons);
    }
}

//call buttons function to generate buttons listed in array 
buttons();

//this click event runs when user hits sumbit or enter after typing in new button value 
$("#userSubmit").on("click", function (event) {
    //prevents page from reloading everytime sumbit button is  clicked 
    event.preventDefault();
    //variable that takes the value of new button user created 
    var newEmotion = $("#newEmotionButton").val().trim();
    //pushes new emotion button to our button topics array
    topics.push(newEmotion);
    //clear input 
    $("#newEmotionButton").val('');
    //call buttons function
    buttons();
});

//function 


//on click event
//allows user to click botton and gernerate gifs 
$(document).on("click", ".clickMeForGif", function () {
    var a = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=5OMJTXCR27pKXP4E9xeUel3ubAzaXQu8&limit=10";

    //calls out to get information 
    $.ajax({
            url: queryURL,
            method: "GET"
        })

        //retrieves information 
        .then(function (response) {

            var results = response.data;
            console.log(response);

            //loops through results taken from  giphy API
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);

                //variable creating new div 
                var gifDiv = $("<div>");

                //variable that gets the rating of gif 
                var rating = results[i].rating;

                //creates a paragraph and puts text into tag 
                var p = $("<p>").text("Rating: " + rating);

                //varriable that  creates image tag 
                var personImage = $("<img>");


                personImage.attr("data-still", results[i].images.original_still.url);
                personImage.attr("data-animate", results[i].images.original.url);
                personImage.attr("data-state", "still");
                personImage.attr("src", results[i].images.original_still.url);

                //adds class to gif image 
                personImage.addClass("pausePlay");

                //appends paragraph tag(rating) to div 
                gifDiv.append(p);

                //appends image tag to  div 
                gifDiv.append(personImage);

                //puts givDif into gifSection in HTML
                $("#gifSection").append(gifDiv);
            }
        });
});

//click event that allows user to click to animate or still the gif 
$(document).on("click", ".pausePlay", function () {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});