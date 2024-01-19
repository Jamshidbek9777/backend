//Starting server
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index");
const cors = require("cors");

app.use(
     cors({
          origin: "http://locahost:3000",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true,
     })
);
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
