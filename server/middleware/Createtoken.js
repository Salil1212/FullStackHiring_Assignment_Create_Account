const passport = require("passport");
const JWT = require("jsonwebtoken");
const { User } = require("../models/user");

const algorithm = "HS256";
const secret = process.env.JWT_SECRET;

passport.use(User.createStrategy());

const signJwtForLogin = (req, res) => {
  const token = JWT.sign(
    {
      sub: req.user._id.toString(),
      email: req.user.email,
      student_id: req.user.student,
    },

    secret,

    {
      algorithm,
      expiresIn: "24h",
    }
  );

  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    })
    .status(200)
    .send({ token: token });
};

const signJwtForSignUp = (req, res, newUser) => {
  const token = JWT.sign(
    {
      sub: newUser._id,
      email: newUser.email,
      student_id: newUser.student,
    },

    secret,

    {
      algorithm,
      expiresIn: "24h",
    }
  );

  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    })
    .status(200)
    .send({ token: token });
};

const destroySession = (req, res) => {
  const token = JWT.sign(
    {},

    secret,

    {
      algorithm,
      expiresIn: "24h",
    }
  );

  res
    .cookie("token", token, {
      expires: new Date(Date.now() - 86400000),
      httpOnly: true,
    })
    .status(200)
    .send("Successful logout");
};

const deleteSession = (req, res, secret, algorithm) => {
  const token = JWT.sign(
    {},

    secret,

    {
      algorithm,
      expiresIn: "24h",
    }
  );
  res
    .cookie("token", token, {
      expires: new Date(Date.now() - 86400000),
      httpOnly: true,
    })
    .status(200)
    .send("Successful logout");
};

module.exports = {
  signJwtForLogin,
  signJwtForSignUp,
  destroySession,
  deleteSession,
  initializePassport: passport.initialize(),

  login: passport.authenticate("local", { session: false }),
};
