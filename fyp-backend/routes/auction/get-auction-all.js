const Auction = require('../../models/auction')

module.exports = async (req, res) => {
    await Auction.find({}, (err, auction) => {
        if (err) {
            return res.status(404).send({ message: "Not Found", status: 404, content: "Null" })
        }
        res.status(200).send({ message: "Successfully Get Auctions", status: 200, content: auction })
    })
}