var mongoose = require('mongoose');
const bidSchema = new mongoose.Schema({
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auctions',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    bidValue: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model("Bids", bidSchema)