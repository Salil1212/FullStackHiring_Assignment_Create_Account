const express = require("express");
const router = express.Router();
const { Student } = require("../models/student");
const { User } = require("../models/user");
const withAuth = require("../middleware/Auth");
const findStudentByToken = require("../middleware/findStudentByToken");
const { deleteSession } = require("../middleware/Createtoken");
const secret = process.env.JWT_SECRET;
const algorithm = "HS256";
//Get all the users
router.get("/all-students", (req, res) => {
  Student.find()
    .limit(50)
    .then((students) => {
      res.status(201).send(students);
    })
    .catch(
      (err) =>
        (res.status(500).send = {
          error: err.message,
        })
    );
});
// Get only the user of the given id
router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    return res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// router.get("/edit-profile/", findStudentByToken);

// Update the user using Id

router.put("/update-profile/:id", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.techStack ||
      !req.body.websiteURL ||
      !req.body.linkedInURL ||
      !req.body.twitterURL ||
      !req.body.githubURL ||
      !req.body.location ||
      !req.body.location ||
      !req.body.fieldOfInterest ||
      !req.body.seeking ||
      !req.body.bio
    ) {
      return res.status(400).send({
        message: "Send all required fields:name,avatarURL,techStack etc",
      });
    }
    const { id } = req.params;
    const result = await Student.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// router.post("/delete-profile", withAuth, function (req, res) {
//   Student.findOneAndDelete({
//     _id: req.body._id,
//   })
//     .then((result) => {
//       UserModel.findOneAndDelete({
//         student: req.body._id,
//       })

//         .then((result) => {
//           deleteSession(req, res, secret, algorithm);
//         })

//         .catch((err) => {
//           res.status(500).send(err);
//         });
//     })

//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

router.delete("/delete-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.findByIdAndDelete(id);
    const result2 = await User.findByIdAndDelete(id);
    if (!result && !result2) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
module.exports = router;
