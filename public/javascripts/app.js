$(document).ready(function() {

  const titleInput = $("#movie-title");
  const poster = $("#poster");
  const runtime = $("#runtime");
  const rated = $("#rated");
  const released = $("#released");
  const imd = $("#imd");
  const rt = $("#rt");
  const mc = $("#mc");
  const plot = $("#plot")
  const error = $("#error")

  titleInput.on("keyup", function(e) {
    if(e.key === "Enter") {
      const movieTitle = titleInput.val();
      titleInput.val("");
      //Send to our own route a get request (ajax)
      $.get(`/movieInfo?title=${movieTitle}`, (response) => {
        if(response.object) {
          plot.html(response.object[7]);
          imd.html(`Internet Movie Database: ${response.object[4]}`);
          rt.html(`Rotten Tomatoes: ${response.object[6]}`);
          mc.html(`Metacritic: ${response.object[5]}`);
          rated.html(`Rated: ${response.object[3]}`)
          released.html(`Released: ${response.object[2]}`)
          runtime.html(`Runtime: ${response.object[1]}`)
          poster.attr("src", response.object[0]);
          poster.removeClass("hidden");
          error.addClass("hidden");
        } else {
          error.removeClass("hidden");
          error.text(`No image available for ${movieTitle}`);
          poster.addClass("hidden")
          plot.html(``);
          imd.html(`Internet Movie Database: `);
          rt.html(`Rotten Tomatoes: `);
          mc.html(`Metacritic: `);
          rated.html(`Rated: `);
          released.html(`Released: `);
          runtime.html(`Runtime: `);
        }
      })
    }
  })

  const drop1 = $(".dropdown:first");
  const drop2 = $(".dropdown:last")

  drop1.on("click", function() {
    drop1.toggleClass("show");
  })

  drop2.on("click", function() {
    drop2.toggleClass("show");
  })

})
