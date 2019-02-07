const Joi = require('joi')
const _ = require('lodash')
const Item = require('../../models/items')

module.exports = async (req, res) => {
    const { error } = validateItem(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: '' })
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        initialValue: req.body.initialValue,
        status: req.body.status,
        itemImage: req.body.itemImage,
        user: req.body.user
    })
    await item.save();
    res.status(200).send({ message: "Item added successfully", status: 200, content: item })
}

function validateItem(item) {
    const schema = {
        title: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        initialValue: Joi.number().required(),
        status: Joi.boolean().required(),
        itemImage: Joi.array().items(Joi.string().required()).required(),
        user: Joi.string().required(),
    }
    return Joi.validate(item, schema)
}