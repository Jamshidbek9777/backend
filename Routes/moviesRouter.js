const express = require("express");
const moviesController = require("../Controller/moviesController");
const cors = require("cors");
app.use(
     cors({
          origin: "https://127.0.0.1:3000",
     })
);
const router = express.Router();
router
     .route("/")
     .get(moviesController.getAllMovies)
     .post(moviesController.createMovie);
router
     .route("/:id")
     .get(moviesController.getMovieWithId)
     .patch(moviesController.updateMovie)
     .delete(moviesController.deleteMovie);

module.exports = router;
