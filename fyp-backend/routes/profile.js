const User = require('../models/user')
module.exports = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).send({ content: user, status: 200, message: "Success" })
}