var mongoose = require('mongoose');
const auctionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    startingBid: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("Auctions", auctionSchema)