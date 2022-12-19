const mongoose = require("mongoose");

module.exports.DBConnect = (uri) => {
  try {
    mongoose.set("strictQuery", true);

    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("db conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
