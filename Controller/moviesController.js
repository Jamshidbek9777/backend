const fs = require("fs");
const Movie = require("./../Models/moviesModel");
//Route handler functions
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

exports.getAllMovies = (req, res) => {
     res.status(200).json({
          status: "succes",
          data: {
               movies: movies,
          },
     });
};
exports.getMovie = (req, res) => {
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
};
exports.getMovieWithId = (req, res) => {
     const id = req.params.id * 1;
     let movie = movies.find((el) => {
          return el.id == id;
     });
     res.status(200).json({
          status: "succes",
          data: {
               movie: movie,
          },
     });
};
exports.updateMovie = (req, res) => {
     const id = req.params.id * 1;
     let movieUpdate = movies.find((el) => {
          return el.id == id;
     });
     let index = movies.indexOf(movieUpdate);
     Object.assign(movieUpdate, req.body);
     movies[index] = movieUpdate;
     fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
          res.status(200).json({
               status: "succes",
               data: {
                    movie: movieUpdate,
               },
          });
     });
};
exports.deleteMovie = (req, res) => {
     const deleteId = req.params.id * 1;

     let choosenMovie = movies.find((el) => {
          return el.id === deleteId;
     });
     if (!choosenMovie) {
          return res.status(404).json({
               status: "fail",
               message: "No movie found with" + deleteId + "id",
          });
     }

     const index = movies.indexOf(choosenMovie);
     movies.splice(index, 1);
     fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
          res.status(204).json({
               status: "succes",
               data: {
                    movie: null,
               },
          });
     });
};
