require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { DBConnect } = require("./config/mongoose.js");
const routes = require("./api/routes/news.route.js");
DBConnect(process.env.MONGO_URI);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./api/routes"));

module.exports = app;
