const Joi = require("joi");
const _ = require("lodash");
const Offers = require("../../models/offers");

module.exports = async (req, res) => {
  // console.log(req.body);
  const { error } = validateItem(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, status: 400, content: "" });
  await Offers.findById(req.params.id, (err, item) => {
    if (err) {
      return res
        .status(200)
        .send({ message: err.message, status: 404, content: "" });
    }
    item.title = req.body.title;
    item.description = req.body.description;
    // item.status = req.body.status;
    item.category = req.body.category;
    item.itemImage = req.body.itemImage;
    item.save(err => {
      if (err) {
        return res
          .status(400)
          .send({ message: err.message, status: 400, content: "" });
      }
      res.status(200).send({
        message: "Offer Updated Successfully!",
        status: 200,
        content: item
      });
    });
  });
};

function validateItem(item) {
  const schema = {
    title: Joi.string().required(),
    category: Joi.string(),
    description: Joi.string().required(),
    status: Joi.boolean(),
    _id: Joi.string(),
    itemImage: Joi.array().items(Joi.string().required()),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    __v: Joi.number()
  };
  return Joi.validate(item, schema);
}
