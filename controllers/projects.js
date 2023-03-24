const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Projects");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id });
      res.render("profile.ejs", { projects: projects, user: req.user });
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
      res.render("project.ejs", { project: project, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Project.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        goal: req.body.goal,
        user: req.user.id,
      });
      console.log("Project has been added!");
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
      console.log("Deleted Project");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
