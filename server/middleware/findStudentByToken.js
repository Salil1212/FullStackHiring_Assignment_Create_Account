const jwt = require("jsonwebtoken");
const { Student } = require("../models/student");
const { User } = require("../models/user");
const secret = process.env.JWT_SECRET;

const findStudentByToken = function (req, res) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        User.findOne({ email: decoded.email })
          .then((user) =>
            Student.findOne({ _id: user.student })

              .then((student) => res.send(student))

              .catch((err) =>
                res
                  .status(500)
                  .send(
                    "Student for this user cannot be found, please contact site administrators"
                  )
              )
          )

          .catch((err) =>
            res
              .status(500)
              .send("User cannot be found, please contact site administrators")
          );
      }
    });
  }
};

module.exports = findStudentByToken;
