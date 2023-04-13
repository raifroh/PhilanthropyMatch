const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const commitmentsController = require("../controllers/commitments")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, projectsController.getProfile);
router.get("/feed", ensureAuth, projectsController.getFeed);
router.get("/commitments", ensureAuth, commitmentsController.getCommitments);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
