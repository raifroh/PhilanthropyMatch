const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commitmentsController = require("../controllers/commitments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Commitment Routes - simplified for now
router.post("/createCommitment/:id", commitmentsController.createCommitment);

module.exports = router;
