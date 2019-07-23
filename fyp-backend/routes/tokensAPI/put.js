const Token = require("../../models/token");

module.exports = async (req, res) => {
  await Token.findById(req.params.id, (err, data) => {
    if (err) {
      return res
        .status(200)
        .send({ message: err.message, status: 404, content: "" });
    }
    data.token = req.body.token;
    data.description = req.body.description;
    data.save(err => {
      if (err) {
        return res
          .status(400)
          .send({ message: err.message, status: 400, content: "" });
      }
      res.status(200).send({
        message: "Token Updated Successfully!",
        status: 200,
        content: data
      });
    });
  });
};
