const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Project Routes - simplified for now
router.get("/:id", ensureAuth, projectsController.getProject);

router.post("/createProject", upload.single("file"), projectsController.createProject);

router.delete("/deleteProject/:id", projectsController.deleteProject);

module.exports = router;
