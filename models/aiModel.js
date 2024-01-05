const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aiSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ai", aiSchema);
