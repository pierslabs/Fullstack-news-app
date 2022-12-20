const http = require("http");
const app = require("./src/app.js");
require("dotenv").config();

const server = http.createServer(app);
server.listen(process.env.PORT);
server.on("listening", () => {
  console.log(`Server run at port: ${process.env.PORT}`);
});

module.exports = server;
