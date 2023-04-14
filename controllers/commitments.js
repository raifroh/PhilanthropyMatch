const Commitment = require("../models/Commitments")
const Project = require("../models/Projects");

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
  getCommitments: async (req, res) => {
    try {
      const commitments = await Commitment.find({ 'user.id': req.user._id }).populate("project").sort({ createdAt: "desc" }).lean();
      const projects = await Project.find();
      console.log(req.user.id)
      console.log('commitments is running')
      res.render("commitments.ejs", { commitments: commitments, user: req.user, projects: projects });
    } catch (err) {
      console.log(err);
    }
  }
};
