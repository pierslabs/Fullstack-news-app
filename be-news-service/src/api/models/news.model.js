const { model, Schema } = require("mongoose");

const NewsSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: "date",
      updatedAt: "archiveDate",
    },
  }
);

module.exports = model("news", NewsSchema);
