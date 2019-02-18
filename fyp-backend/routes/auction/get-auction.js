const Auction = require('../../models/auction')

module.exports = async (req, res) => {
    let auction = await Auction.find({ user: req.params.id }).populate("item")
    if (auction.length) {
        res.status(200).send({ message: "Active Auctions", status: 200, content: auction });
    }
    else {
        return res.status(404).send({ message: "Not Found", status: 404, content: "Null" })
    }
}