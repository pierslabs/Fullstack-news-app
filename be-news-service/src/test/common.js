require("dotenv").config();
const New = require("../api/models/news.model.js");

module.exports.dbCleanUp = async () => {
  return await New.deleteMany({ author: "_test" });
};
