const _ = require('lodash')
const Bid = require('../../models/bid')
const User = require('../../models/user')

module.exports = async (req, res) => {
    let bid = await Bid.findOne({ auction: req.params.auctionID })
    if (!bid) return res.send({ message: "Not Found", status: 404, content: "" })
    let index = bid.bidInfo.length - 1;
    const user = await User.findById(bid.bidInfo[index].user).select('-password -__v')
    let bidInfo = _.cloneDeep(bid.bidInfo[index]);
    let obj = _.assign({}, { _id: user._id, name: user.firstName + ' ' + user.lastName, email: user.email, bidAmount: bidInfo.bidValue, numOfBids: index + 1 });
    return res.status(200).send({ message: "Found Bid", status: 200, content: obj })
}