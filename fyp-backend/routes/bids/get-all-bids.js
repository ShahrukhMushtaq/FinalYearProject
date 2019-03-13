const _ = require('lodash')
const Bid = require('../../models/bid')

module.exports = async (req, res) => {
    let bid = await Bid.find({})
    if (!bid) return res.send({ message: "Not Found", status: 404, content: "" })
    return res.status(200).send({ message: "Found Bid", status: 200, content: bid })
}