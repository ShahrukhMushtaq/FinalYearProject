const User = require('../models/user')
const Joi = require('joi');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: "" })
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send({ message: "You have already registered", status: 400, content: "" })
    user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        avatar: req.body.avatar,
        location: req.body.location,
        age: req.body.age,
        phone: req.body.phone,
        gender: req.body.gender,
        about: req.body.about
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    const token = user.generateAuthToken()
    res.header('x-access-token', token).send({ message: "Successfully Registered", status: 200, content: _.pick(user, ['_id', 'name', 'email']) })
}

function validateUser(user) {
    const schema = {
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(1024).required(),
        age: Joi.number().integer().min(18).max(70).required(),
        phone: Joi.number().required(),
        location: Joi.string().required(),
        gender: Joi.string().required(),
        avatar: Joi.string(),
        about: Joi.string(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),
    }
    return Joi.validate(user, schema)
}