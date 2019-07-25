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
    let offers = _.orderBy(item, ["createdAt"], ["desc"]);
    let categories = _.map(offers, o => o.category);
    res.status(200).send({
      message: "Successfully Get All categories",
      status: 200,
      content: [...new Set(categories)]
    });
  });
};
