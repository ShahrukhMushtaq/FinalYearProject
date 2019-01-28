const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
module.exports = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400 })
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send({ message: "Invalid email or password", status: 400 })
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password", status: 400 })
    const token = user.generateAuthToken()
    res.header("x-access-token", token).send({ messsage: "User Authenticated", status: 200 })
}

function validateUser(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(user, schema)
}