const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    description: { type: String },
    // estimation: {
    //   startDate: { type: Date, required: true },
    //   dueDate: { type: Date, required: true },
    // },
    estimation:{type: String, required: true},
    type: { type: String, required: true },
    people: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Completed"],
      default: "To-Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
