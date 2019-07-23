var mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Tokens", tokenSchema);
