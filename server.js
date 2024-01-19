//Starting server
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index");
const cors = require("cors");

app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
     res.header(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE"
     );
     res.header("Access-Control-Allow-Headers", "Content-Type");
     res.header("Access-Control-Allow-Credentials", true);
     next();
});
// console.log(process.env);
mongoose.connect(process.env.CONN_STR, {}).then((conn) => {
     // console.log(conn);
     console.log("DB connection successful");
});

// const testMovie = new Movie({
//      name: "Home alone",
//      description: "This movie is created by Umbrella corporatioin",
//      duration: 250,
//      ratings: 5,
// });
// testMovie.save().then((docs) => {
//      console.log(docs);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
     console.log("Server has started");
});
