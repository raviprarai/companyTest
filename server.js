const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("./connection/db");
dotenv.config();
//!This is a middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
connect();
// ! This is a Router Path
app.use("/user", require("./Router/userRouter"));

app.get("/", (req, res) => {
  res.send("<h1>A Node Js API is listening on port:8000</h1>");
});

app.get("/*", (req, res) => {
  res.send(" Please Enter the correct URL.");
});
app.post("/*", (req, res) => {
  res.send("Please Enter the correct URL.");
});
app.put("/*", (req, res) => {
  res.send("Please Enter the correct URL.");
});
app.delete("/*", (req, res) => {
  res.send("Please Enter the correct URL.");
});
var PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`A Node Js API is listening on port: ${PORT}`);
});
