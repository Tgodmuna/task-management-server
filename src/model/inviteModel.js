const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipientEmail: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invite", InviteSchema);
