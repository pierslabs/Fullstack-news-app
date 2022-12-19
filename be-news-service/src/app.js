const express = require("express");
const cors = require("cors");
const { serverConnection } = require("./config/server.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

module.exports = serverConnection(app);
