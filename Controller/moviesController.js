const Movie = require("./../Models/moviesModel");
exports.getAllMovies = async (req, res) => {
     try {
          const excludeFields = ["sort", "page", "limit", "fields"];
          const queryObj = { ...req.query };
          excludeFields.forEach((el) => {
               delete queryObj[el];
          });
          // console.log(req.query);
          // console.log(queryObj);

          let query =  Movie.find(queryObj);
          if (req.query.sort) {
               query = query.sort(req.query.sort);
          }
          const movies = await query;
          res.status(200).json({
               status: "succes",
               length: movies.length,
               data: {
                    movies: movies,
               },
          });
     } catch (err) {
          res.status(404).json({
               status: "fail",
               message: err.message,
          });
     }
};
exports.createMovie = async (req, res) => {
     try {
          const movie = await Movie.create(req.body);
          res.status(201).json({
               status: "succes",
               data: {
                    movie: movie,
               },
          });
     } catch (err) {
          res.status(400).json({
               status: "fail",
               message: err.message,
          });
     }
};
exports.getMovieWithId = async (req, res) => {
     try {
          const movie = await Movie.findById(req.params.id);
          res.status(200).json({
               status: "succes",
               data: {
                    movie,
               },
          });
     } catch (err) {
          res.status(404).json({
               status: "fail",
               message: err.message,
          });
     }
};
exports.updateMovie = async (req, res) => {
     try {
          const updatedMovie = await Movie.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                    new: true,
                    runValidators: true,
               }
          );
          res.status(200).json({
               status: "succes",
               data: {
                    movie: updatedMovie,
               },
          });
     } catch (err) {
          res.status(404).json({
               status: "fail",
               message: err.message,
          });
     }
};
exports.deleteMovie = async (req, res) => {
     try {
          const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
          res.status(204).json({
               status: "succes",
               data: null,
          });
     } catch (err) {
          res.status(404).json({
               status: "fail",
               message: err.message,
          });
     }
};
