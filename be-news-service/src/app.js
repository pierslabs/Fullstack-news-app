require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { serverConnection } = require("./config/server.js");
const { DBConnect } = require("./config/mongoose.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

DBConnect(process.env.MONGO_URI);

module.exports = serverConnection(app);
