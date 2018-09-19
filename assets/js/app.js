$(document).ready(function (){

    // initial list of button and giphy searches available
    var ams = ['leek', 'potato'];


    //draws search buttons to buttons div
    function btndraw() {
        $('#buttons').empty();
        for(var i = 0; i < ams.length; i++){
          var newbtn = $('<button class="btn btn-success gif-btn">');
          newbtn.attr('data-term', ams[i]);
          newbtn.attr('data-pgnum', 0);
          newbtn.text(ams[i]);
          $('#buttons').append(newbtn);
        }
    } 

    //finds and draws all the gifs to the 
    $(document).on('click', '.gif-btn', function() {
        var term = $(this).text(); // or this attribute data
        term.replace('!/a-zA-Z/g', '');
        term = term.split(' ');
        term = term.join('+');
        var pg = $(this).attr('data-pgnum');
        //increment page number on click
        $(this).attr('data-pgnum', pg + 10);
        
        $.get({url:'https://api.giphy.com/v1/gifs/search?q=' +
            term + '&offset='+ pg +'&api_key=Qxbopc4Kv6gJdM4Ow5mXPH1DhplWmzyP&limit=10'})

        //adds the gifs to the page
        .then(function(result){
            var gifs = result.data;
        //should add still, active and status attributes to images
            for (var i = 0; i < gifs.length; i++) {
                var newDiv = $('<div>');
                var newgif = $('<img class=gif>');
                newgif.attr('src', gifs[i].images.original_still.url);
                newgif.attr('data-still', gifs[i].images.original_still.url);
                newgif.attr('data-active', gifs[i].images.original.url);
                newgif.attr('data-state', 'still');
                newDiv.append('<p>Title: ' + gifs[i].title.replace(' GIF', '') + '</p>');
                newDiv.append(newgif);
                newDiv.append('<p>Rating: '+ gifs[i].rating + '</p>');
                $('#results').prepend(newDiv, '<br>');
            }
        });
    })

    //changes toggles gif from still to active and vice versa
    $(document.body).on('click', '.gif', function () {
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-active.
      // Then, set the image's data-state to active
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-active"));
        $(this).attr("data-state", "active");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })

    // get from submit and call add btn function
    $('#addbtn').on('click', function(event) {
        event.preventDefault()
        var newSearch = $('#gif-input').val().trim();
        ams.push(newSearch);
        btndraw();
    })


    btndraw();
});