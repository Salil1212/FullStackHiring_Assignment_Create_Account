const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT, mongoDBURL } = require("./config");
require("dotenv").config();

const { initializePassport } = require("./middleware/Createtoken");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(initializePassport);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => console.log(error));
app.get("/home", (req, res) => {
  res.send("This is home page");
});
app.get("/", (req, res) => {
  res.send("This is dashboard");
});
app.use("/api/auth", require("./routes/authenticate_route"));
app.use("/api/students", require("./routes/student_routes"));

app.listen(PORT || 8080, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
