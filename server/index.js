const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { initializePassport } = require("./middleware/Createtoken");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(initializePassport);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// mongoose.connect(
//   process.env.DB_PATH || process.env.TEST_DB_PATH,
//   { useNewUrlParser: true },
//   (err) => {
//     if (err) {
//       console.log("Error connecting to database", err);
//     } else {
//       console.log("Connected to database!");
//     }
//   }
// );

app.use("/api/auth", require("./routes/authenticate_route"));
app.use("/api/students", require("./routes/student_routes"));

app.listen(process.env.PORT || 4000, () =>
  console.log("Listening on http://localhost:8080")
);
