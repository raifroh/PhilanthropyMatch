const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Projects");
const Commitment = require("../models/Commitments")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id });
      res.render("profile.ejs", { projects: projects, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { projects: projects });
    } catch (err) {
      console.log(err);
    }
  },
  getProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      const commitments = await Commitment.find({project: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("project.ejs", { project: project, user: req.user, commitments: commitments });
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      // Check if the goal input is a number
      if (isNaN(req.body.goal)) {
        req.flash("error", "Goal must be a number");
        return res.redirect("/profile");
      }
  
      let result;
      try {
        result = await cloudinary.uploader.upload(req.file.path);
      } catch (error) {
        req.flash("error", "Please upload a valid image");
        return res.redirect("/profile");
      }
  
      await Project.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        goal: req.body.goal,
        user: req.user.id,
      });
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteProject: async (req, res) => {
    try {
      // Find project by id
      let project = await Project.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(project.cloudinaryId);
      // Delete project from db
      await Project.remove({ _id: req.params.id });
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
