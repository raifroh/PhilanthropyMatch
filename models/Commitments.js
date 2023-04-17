const mongoose = require("mongoose");

const CommitmentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commitment: {
    type: Number,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Commitment", CommitmentSchema);
