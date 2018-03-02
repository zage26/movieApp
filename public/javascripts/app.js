$(document).ready(function() {
  const titleInput = $("#movie-title");
  const poster = $("#poster");
  const error = $("#error");
  titleInput.on("keyup", function(e) {
    if(e.key === "Enter") {
      const movieTitle = titleInput.val();
      titleInput.val("");
      //Send to our own route a get request (ajax)
      $.get(`/movieInfo?title=${movieTitle}`, (response) => {
        if(response.poster) {
          poster.attr("src", response.poster);
          poster.removeClass("hidden");
          error.addClass("hidden");
        } else {
          error.removeClass("hidden");
          error.text(`No image available for ${movieTitle}`);
          poster.addClass("hidden")
        }
      })
    }
  })
})
