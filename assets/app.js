$(document).ready(function() {

    var topics = ["cat", "dog", "pig", "simpson"]; // create an array topics

    // =======================================================
    // Function: PrepareTopicsSearch
    // Purpose: Display all pre-defined topics into buttons    
    function PrepareTopicsSearch(){
        // add data-value attribute
        for(var i = 0; i < topics.length; i++){            
            addButtonSearch(topics[i]);
        }
        
    }

    function addButtonSearch(value){        
        var button = $("<button class='btn btn-primary btn-lg button-giphy' data-value='" + value + "'>" + value + "</button>");             
        $("#giphy-view").append(button);
    }

    function displayGif(gifs){      
        // var topicContainer = $("<div class='container-topic'>");  
        var results = $("#results");
        for(var i = 0; i < gifs.length; i++){ // length will be always = 10
            
            var container = $("<div class='container-gif'>"); // create container to hold rating and image
            var rating = gifs[i].rating;
            console.log(rating);
            var header = $("<h5 class='text-center'>").text("Rating: " + rating);
            
            var stillValue = gifs[i].images.fixed_height_still.url;            
            var animateValue = gifs[i].images.fixed_height.url;
            var gif = $("<img class='gif img-thumbnail' src='" + stillValue + "'>")
            
            gif.attr("data-still", stillValue); // set data-still value
            gif.attr("data-animate", animateValue); // set data-animate value
            gif.attr("data-state", "still"); // set data-state value
            container.css("float", "left");
            container.append(header, gif);

            results.append(container);
        }        

        var divider = $("<hr class='my-4 divider'>");
        var emptyDiv = $("<div>");
        emptyDiv.css("clear", "both"); // clear the floating so next topic would get to a new line
        emptyDiv.append(divider);
        results.append(emptyDiv);
        

    }

    

    // **********************************************************************************************

    // Start from here !!!
    PrepareTopicsSearch();

    // When Add Topic button is clicked
    $(document).on("click", "#find-giphy", function(event) {
        
        // Here we grab the text from the input box
        var giphy = $("#giphy-input").val();
        if(giphy != "") {
            event.preventDefault();

            // add giphy button search
            addButtonSearch(giphy);
        }
    })

    
    // When button giphy is clicked
    $(document).on("click", ".button-giphy", function(){
        var keyword = $(this).attr("data-value");
        console.log(keyword);

        var apiKey = "CjUmTSktQYMcUDbD7HRFwGCBXclFYlmS";
        var limit = 10; // set limit to 10
        //var rating = "";
        //var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=cat&limit=25&offset=0&rating=G&lang=en";
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q='" + keyword + "'&limit=" + limit + "&offset=0&lang=en";

        $.ajax({
            url : queryURL,
            method : 'GET'
        }).then(function(resp){            
            displayGif(resp.data);

        }).catch(function(err){
            console.error(err);
        })

    })
    
    // When an gif image is clicked
    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state"); // get image state

        if(state === "still") {
            var animateValue = $(this).attr("data-animate");
            $(this).attr("src", animateValue);
            $(this).attr("data-state", "animate");
        }
        else {
            var stillValue = $(this).attr("data-still");
            $(this).attr("src", stillValue);
            $(this).attr("data-state", "still");
        }
    })
    
})