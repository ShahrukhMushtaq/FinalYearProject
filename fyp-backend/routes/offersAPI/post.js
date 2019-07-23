const Joi = require("joi");
const _ = require("lodash");
const Offer = require("../../models/offers");

module.exports = async (req, res) => {
  const { error } = validateOffer(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, status: 400, content: "" });
  const offer = new Offer({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    itemImage: req.body.itemImage
  });
  await offer.save();
  res
    .status(200)
    .send({ message: "Offer added successfully", status: 200, content: offer });
};

function validateOffer(offer) {
  const schema = {
    title: Joi.string().required(),
    category: Joi.string(),
    description: Joi.string().required(),
    status: Joi.boolean(),
    itemImage: Joi.array().items(Joi.string().required()),
  };
  return Joi.validate(offer, schema);
}
