const _ = require('lodash')
const Item = require('../../models/items')

module.exports = async (req, res) => {
    await Item.find({ user: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).send({ message: "Error", status: 404, content: "Null" })
        }
        if (!item.length) {
            return res.status(404).send({ message: "Not Found", status: 404, content: "Null" })
        }
        res.status(200).send({ message: "Successfully Get Items", status: 200, content: item })
    })
}
