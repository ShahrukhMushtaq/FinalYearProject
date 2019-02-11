const Joi = require('joi')
const _ = require('lodash')
const Item = require('../../models/items')

module.exports = async (req, res) => {
    const { error } = validateItem(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: '' })
    await Item.findById(req.params.id, (err, item) => {
        if (err) {
            return res.status(404).send({ message: err.message, status: 404, content: '' })
        }
        item.title = req.body.title;
        item.description = req.body.description;
        item.initialValue = req.body.initialValue;
        item.status = req.body.status;
        item.category = req.body.category;
        item.itemImage = req.body.itemImage;
        item.save((err) => {
            if (err) {
                return res.status(400).send({ message: err.message, status: 400, content: "" })
            }
            res.status(200).send({ message: "OK", status: 200, content: item })
        });
    })
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
        _id: Joi.string()
    }
    return Joi.validate(item, schema)
}