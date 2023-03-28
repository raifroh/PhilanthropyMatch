const mongoose = require("mongoose");

const CommitmentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commitment: {
    type: Number,
    required: true,
    get: function (value) {
      return '$' + value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1').replace(/\.?0+$/, '');
    },
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Commitment", CommitmentSchema);
