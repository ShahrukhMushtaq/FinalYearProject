const _ = require('lodash')
const Bid = require('../../models/bid')

module.exports = async (req, res) => {
    let bid = await Bid.findOne({ auction: req.params.auctionID })
    if (!bid) return res.status(400).send({ message: "Not Found", status: 400, content: "" })
    return res.status(200).send({ message: "Found Bid", status: 200, content: bid })
}