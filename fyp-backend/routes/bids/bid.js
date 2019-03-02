const Joi = require('joi')
const _ = require('lodash')
const Bid = require('../../models/bid')

module.exports = async (req, res) => {
    if (req.body.auction && req.body.user && req.body.bidValue) {
        let oldBid = await Bid.findOne({ auction: req.body.auction })
        if (!oldBid) {
            console.log("sdf")
            const bid = new Bid({
                auction: req.body.auction,
                user: req.body.user,
                bidValue: req.body.bidValue,
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