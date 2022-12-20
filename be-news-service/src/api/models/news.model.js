const { model, Schema } = require("mongoose");

const NewsSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
    archiveDate: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "date",
    },
  }
);

module.exports = model("news", NewsSchema);
