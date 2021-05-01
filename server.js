/** @format */

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://Admin-Karthik:qwerty12@cluster0.semtp.mongodb.net/List",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use("/", require("./routes/users"));

app.use("/create", require("./routes/route"));

app.listen(port, () => {
  console.log("server is running");
});
