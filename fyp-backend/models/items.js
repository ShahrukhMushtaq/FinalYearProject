var mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    initialValue: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    itemImage: [{ type: String }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})
module.exports = mongoose.model("Items", itemSchema)