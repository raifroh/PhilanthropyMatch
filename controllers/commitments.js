const Commitment = require("../models/Commitments")

module.exports = {
  createCommitment: async (req, res) => {
    try {
      await Commitment.create({
        comment: req.body.comment,
        commitment: req.body.commitment,
        project: req.params.id,
        user: {
          id: req.user._id,
          userName: req.user.userName
        },
      });
      console.log("Project has been added!");
      res.redirect("/project/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
