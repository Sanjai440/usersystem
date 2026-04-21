const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,

  trainingCompleted: {
    type: Boolean,
    default: false,
  },

  examCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);