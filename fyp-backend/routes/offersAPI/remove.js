const Offers = require("../../models/offers");

module.exports = async (req, res) => {
  Offers.findByIdAndRemove(req.params.id)
    .then(offer => {
      if (!offer) {
        return res.send({
          message: "Offer not found with id " + req.params.id,
          status: 404
        });
      }
      res.send({ message: "Offer deleted successfully!", status: 200 });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
};
