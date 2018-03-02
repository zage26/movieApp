const express = require("express");
const hbs = require("hbs");
//comes with node
const path = require("path");
const axios = require("axios");
// const js = require("./public/css/app.js")

/*Different way the front end can talk to the backend:
(1) simple redirect --> <a href="/movie"></a>
(2) window is an object, can replace the location of the window
    --> window.location.replace("/movie") *trigger an event*
(3) update the dom, send to our own route a get request
*/
const app = express();

app.set("views", path.join(__dirname, "views"));
//default hbs file
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.render("index.hbs");
})

app.get("/movieInfo", (req, res) => {
  //Controls output
  const title = req.query.title;
  // const apikey = "259d74c2";
  //How to pull something out of the command line
  const apiKey = process.env.API_KEY
  console.log(apiKey);
  //Pull out current api key
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
    .then((response) => {
      const poster = response.data.Poster;
      // console.log(response);
      //Object --> normal http requests
      res.send({poster});
    })
    .catch((error) => {
      res.send({})
    })
})

app.listen(3000, () => {
  console.log("Server up on port 3000");
})
