const _ = require("lodash");
const Offers = require("../../models/offers");

module.exports = async (req, res) => {
  await Offers.find({}, (err, item) => {
    if (err) {
      return res
        .status(404)
        .send({ message: "Error", status: 404, content: "Null" });
    }
    if (!item.length) {
      return res.send({
        message: "Not Offers Available",
        status: 404,
        content: []
      });
    }
    res.status(200).send({
      message: "Successfully Get All Offers",
      status: 200,
      content: _.orderBy(item, ["createdAt"], ["desc"])
    });
  });
};
