/** @format */
const express = require("express");
const router = express.Router();
const List = require("../models/Listmodel");

router.get("/", (req, res) => {
  List.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
router.post("/", (req, res) => {
  const value = req.body.items;
  const list = new List({
    items: value,
  });
  list
    .save()
    .then(() => res.json("added"))
    .catch((err) => console.log(err));
});
router.post("/:id", (req, res) => {
  List.findById(req.params.id).then((user) => {
    user.items = req.body.items;
    user.save().then(() => res.json("updated"));
  });
});

router.get("/:id", (req, res) => {
  List.findById(req.params.id).then((user) => res.json(user));
});
router.delete("/:id", (req, res) => {
  List.findByIdAndDelete(req.params.id).then(() => res.json("deleted"));
});

module.exports = router;
