var mongoose = require("mongoose");
const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String
    },
    itemImage: [{ type: String }]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Offers", offerSchema);
