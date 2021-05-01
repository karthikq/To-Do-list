/** @format */

const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  {
    timestamps: true,
  }
);

const User = new Mongoose.model("user", userSchema);

module.exports = User;
