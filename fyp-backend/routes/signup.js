const User = require('../models/user')
const Joi = require('joi');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400 })
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send({ message: "User already exist", status: 400 })
    user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        avtar: req.file.originalname,
        location: req.body.location,
        age: req.body.age
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send({ message: "Successfully Registered", status: 200, content: _.pick(user, ['_id', 'name', 'email']) })
}

function validateUser(user) {
    const schema = {
        email: Joi.string().email().required(),
        name: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(5).max(1024).required(),
        age: Joi.number().integer().min(18).max(70).required(),
        location: Joi.string().required()
    }
    return Joi.validate(user, schema)
}