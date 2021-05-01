/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/Usermodel");
const { registerValidation, loginValidation } = require("../Validation");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  console.log("d");
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // checking validation
  const { error } = registerValidation(req.body);
  // displaing error
  if (error) return res.status(400).send(error.details[0].message);

  // Checking email if it exists

  const emailExists = await User.findOne({ email: email });
  if (emailExists) return res.status(400).send("Email exists");
  // Hasing password
  var hash = await bcrypt.hashSync(password, salt);

  const user = new User({
    email: email,
    password: hash,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // checking validation
  const { error } = loginValidation(req.body);
  // displaing error
  if (error) return res.json(error.details[0].message);

  // checking if email exits or not
  const user = await User.findOne({ email: email });
  if (!user) return res.json("Email id doesn't exists");
  //Comparing password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.json({ message: "Password is wrong" });
  } else {
    res.json("/create");
  }
});

module.exports = router;
