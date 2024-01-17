// Import package
const express = require("express");
const fs = require("fs");
let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));
app.use(express.json());
// Get - api/v1/movies
app.get("/api/v1/movies", (req, res) => {
     res.status(200).json({
          status: "succes",
          count: movies.length,
          data: {
               movies: movies,
          },
     });
});

// Get element by id-  /api/v1/movies/id
app.get("/api/v1/movies/:id", (req, res) => {
     const id = req.params.id;
     let movie = movies.find((el) => {
          return el.id == id;
     });
     if (!movie) {
          return res.status(404).json({
               status: "fail",
               message: "Movie with id " + id + " not found",
          });
     }
     res.status(200).json({
          status: "succes",
          data: {
               movie: movie,
          },
     });
});

//Post -api/v1/movies
app.post("/api/v1/movies", (req, res) => {
     console.log(req.body);
     const newId = movies[movies.length - 1].id + 1;
     const newMovie = Object.assign({ id: newId }, req.body);
     movies.push(newMovie);
     fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
          res.status(201).json({
               status: "succes",
               data: {
                    movie: newMovie,
               },
          });
     });
     //      res.send("Created");
});
//Creating server
const port = 3000;
app.listen(port, () => {
     console.log("Server has started");
});
