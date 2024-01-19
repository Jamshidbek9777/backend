const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config({ path: "./config.env" });
const Movie = require("../Models/moviesModel");
mongoose.connect(process.env.CONN_STR, {}).then((conn) => {
     console.log(conn);
     console.log("DB connection successful");
});

//Reading movies file
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
const deleteMovies = async () => {
     try {
          await Movie.deleteMany();
          console.log("All exicting movies are deleted");
     } catch (err) {
          console.log(err.message);
     }
     process.exit();
};
const importMovies = async () => {
     try {
          await Movie.create(movies);
          console.log("Movies are imported");
     } catch (err) {
          console.log(err.message);
     }
     process.exit();
};

if (process.argv[2] == "--import") {
     importMovies();
} else if (process.argv[2] == "--delete") {
     deleteMovies();
}
