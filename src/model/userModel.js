const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    profileUrl: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
