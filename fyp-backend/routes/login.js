const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
module.exports = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: "" })
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send({ message: "Invalid email or password", status: 400, content: "" })
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password", status: 400, content: "" })
    const token = user.generateAuthToken()
    res.header("x-access-token", token).send({ message: "User Authenticated", status: 200, content: { token: token, user: user } })
}

function validateUser(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(1024).required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),
    }
    return Joi.validate(user, schema)
}