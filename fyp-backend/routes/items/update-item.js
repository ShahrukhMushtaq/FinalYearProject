const Joi = require('joi')
const _ = require('lodash')
const Item = require('../../models/items')

module.exports = async (req, res) => {
    const { error } = validateItem(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: '' })
    await Item.findOneAndUpdate(req.params.id, req.body, (err, item) => {
        if (err) {
            return res.status(404).send({ message: err.message, status: 404, content: '' })
        }
        res.status(200).send({ message: "OK", status: 200, content: req.body })
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
    }
    return Joi.validate(item, schema)
}