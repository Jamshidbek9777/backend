const mongoose = require("mongoose");
const moviesSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "This filed is required"],
          unique: true,
     },
     description: String,
     duration: Number,
     ratings: {
          type: Number,
          default: 1.0,
     },
});
const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;
