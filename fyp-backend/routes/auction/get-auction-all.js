const Auction = require('../../models/auction')
module.exports = async (req, res) => {
    var auctions = await Auction.find().populate("item");
    if (auctions.length) {
        res.status(200).send({ message: "Active Auctions", status: 200, content: auctions });
    }
    else {
        return res.status(404).send({ message: "Not Found", status: 404, content: "Null" })
    }
}