const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gravatar: {
    type: String,
    default: "",
  },
  techStack: {
    type: Array,
    default: [],
  },
  location: {
    type: String,
  },
  fieldOfInterest: {
    type: String,
    default: "I like both",
  },
  seeking: {
    type: Array,
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
  githubURL: {
    type: String,
    default: "",
  },
  twitterURL: {
    type: String,
    default: "",
  },
  webisteURL: {
    type: String,
    default: "",
  },
  linkedinURL: {
    type: String,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = { StudentSchema, Student };
