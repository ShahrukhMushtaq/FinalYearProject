const Joi = require('joi')
const _ = require('lodash')

module.exports = async (req, res) => {
    const { error } = validateItem(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: '' })
    res.status(200).send({ message: "OK", status: 200, content: '' })
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