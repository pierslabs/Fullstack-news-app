require("dotenv").config();
const http = require("http");

module.exports.serverConnection = (app) => {
  const server = http.createServer(app);
  server.listen(process.env.PORT);
  server.on("listening", () => {
    console.log(`Server run at port: ${process.env.PORT}`);
  });
};
