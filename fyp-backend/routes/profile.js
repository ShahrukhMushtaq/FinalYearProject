const User = require('../models/user')
module.exports = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v')
    res.status(200).send({ content: user, status: 200, message: "Successfully Get Profile" })
}