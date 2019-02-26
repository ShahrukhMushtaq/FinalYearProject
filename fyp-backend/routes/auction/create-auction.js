const Joi = require('joi')
const Auction = require('../../models/auction')
const _ = require('lodash')

module.exports = async (req, res) => {
    const { error } = await validateAuction(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message, status: 400, content: '' })
    Auction.findOne({ item: req.body.item }, async (err, item) => {
        if (err) {
            return res.status(400).send({ message: 'Error in Finding Item', status: 400, content: '' })
        }
        if (item) {
            console.log(item)
            return res.send({ message: "Found Duplicate Auction", status: 201, content: '' })
        }
        else {
            const auction = new Auction({
                user: req.body.user,
                item: req.body.item,
                endTime: req.body.endTime,
                endDate: req.body.endDate,
                startingBid: req.body.startingBid
            })
            await auction.save();
            res.status(200).send({ message: "Auction Created Successfully", status: 200, content: _.omit(auction.toObject(), '__v') })

        }
    })
}

function validateAuction(auction) {
    const schema = {
        user: Joi.string().required(),
        item: Joi.string().required(),
        endTime: Joi.number().required(),
        endDate: Joi.number().required(),
        startingBid: Joi.number().required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),
    }
    return Joi.validate(auction, schema)
}