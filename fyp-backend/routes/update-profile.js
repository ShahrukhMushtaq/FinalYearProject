const User = require('../models/user')
const Joi = require('joi')
const _ = require('lodash')

module.exports = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: "" })
    await User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(400).send({ message: error.details[0].message, status: 400, content: "" })
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phone = req.body.phone;
        user.location = req.body.location;
        user.gender = req.body.gender;
        user.about = req.body.about;
        user.avatar = req.body.avatar;
        user.save((err) => {
            if (err) {
                return res.status(400).send({ message: error.details[0].message, status: 400, content: "" })
            }
            res.status(200).send({ content: _.omit(user.toObject(), 'password', '__v'), status: 200, message: "User Updated Successfully" })
        });
    })
}

function validateUser(user) {
    const schema = {
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        age: Joi.number().integer().min(18).max(70).required(),
        phone: Joi.number().required(),
        location: Joi.string().required(),
        avatar: Joi.string(),
        gender: Joi.string(),
        about: Joi.string(),
        _id: Joi.string(),
        email: Joi.string().email().required(),
    }
    return Joi.validate(user, schema)
}