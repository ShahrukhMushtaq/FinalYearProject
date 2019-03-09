const Joi = require('joi')
const _ = require('lodash')
const Bid = require('../../models/bid')

module.exports = async (req, res) => {
    if (req.body.auction && req.body.bidValue && req.body.bidInfo) {
        let oldBid = await Bid.findOne({ auction: req.body.auction })
        if (!oldBid) {
            console.log("sdf")
            const bid = new Bid({
                auction: req.body.auction,
                bidValue: req.body.bidValue,
                bidInfo: req.body.bidInfo,
            })
            await bid.save()
                .then(data => {
                    res.send({ message: "Bid Placed", status: 200, content: data })
                }).catch(err => {
                    res.send({ message: err, status: 200, content: '' })
                });
        }
        else {
            console.log("update")
            oldBid.bidValue = req.body.bidValue;
            oldBid.bidInfo.push({ user: req.body.bidInfo[0].user, bidValue: req.body.bidInfo[0].bidValue });
            await oldBid.save()
                .then(data => {
                    res.send({ message: "Bid Placed", status: 200, content: data })
                }).catch(err => {
                    res.send({ message: err, status: 200, content: '' })
                });
        }
    }
    else {
        res.send({ message: "Invalid Info", status: 400, content: '' })
    }
}