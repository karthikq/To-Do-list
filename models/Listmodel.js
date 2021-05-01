/** @format */

const Mongoose = require("mongoose");

const listSchema = new Mongoose.Schema({
  items: String,
});
const List = new Mongoose.model("listitems", listSchema);

module.exports = List;
