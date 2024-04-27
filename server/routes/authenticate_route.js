const express = require("express");
const { User } = require("../models/user");
const { Student } = require("../models/student");
const passport = require("passport");
const router = express.Router();
const md5 = require("js-md5");

const {
  signJwtForLogin,
  signJwtForSignUp,
  login,
  destroySession,
} = require("../middleware/Createtoken");

router.post("/register", (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    techStack: req.body.techStack,
    websiteURL: req.body.websiteURL,
    linkedInURL: req.body.linkedInURL,
    twitterURL: req.body.twitterURL,
    githubURL: req.body.githubURL,
    location: req.body.location,
    fieldOfInterest: req.body.fieldOfInterest,
    seeking: req.body.seeking,
    bio: req.body.bio,

    // gravatar: md5(req.body.email),
  });

  newStudent.save();
  // res.status(201).send("Student added successfully");
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,

    student: newStudent._id,
  });
  newUser.save();
  res.status(201).send("Student added successfully");

  // User.register(newUser, req.body.password, (err) => {
  //   if (err) {
  //     res.status(500).send(err.message);
  //   }

  //   passport.authenticate("local", { session: false })(req, res, () => {
  //     signJwtForSignUp(req, res, newUser);
  //   });
  // });
});

router.post("/login", login, signJwtForLogin);

router.get("/logout", destroySession);

module.exports = router;
