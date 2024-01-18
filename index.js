const express = require("express");
let app = express();
app.use(express.json());
const moviesRouter = require("./Routes/moviesRouter");
app.use("/api/v1/movies", moviesRouter);

module.exports = app;
