const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const { StudentModel } = require("./student");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "standard",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameUnique: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = { UserSchema, User };
