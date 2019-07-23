const _ = require("lodash");
const Token = require("../../models/token");

module.exports = async (req, res) => {
  if (req.body.token) {
    const token = new Token({
      token: req.body.token
    });
    await token.save();
    res.status(200).send({
      message: "Token added successfully",
      status: 200,
      content: token
    });
  } else {
    res.status(200).send({
      message: "Token is Required",
      status: 200,
      content: {}
    });
  }
};
