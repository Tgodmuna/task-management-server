// @ts-nocheck
const express = require("express");
const Task = require("../model/taskModel");
const User = require("../model/userModel");

const router = express.Router();

// Create a new task
router.post("/createTask", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);

  res.status(400).send(error);
});

// Read all tasks
router.get("/readTasks", async (req, res) => {
  const tasks = await Task.find();
  res.status(200).send(tasks);

  res.status(500).send(error);
});

// Read a single task by ID
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send();
  }
  res.status(200).send(task);
  res.status(500).send(error);
});

// Update a task by ID
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "estimation",
    "taskType",
    "assignedUsers",
    "status",
    "priority",
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send();
  }

  updates.forEach((update) => (task[update] = req.body[update]));
  await task.save();
  res.status(200).send(task);
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).send();
  }
  res.status(200).send(task);
  res.status(500).send(error);
});

// Track date estimation
router.post("/:id/trackEstimation", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send();
  }
  task.estimation = req.body.estimation;
  await task.save();
  res.status(200).send(task);
});

// Update task status
router.patch( "/:id/updateStatus", async ( req, res ) => {
    if ( !req.body.status )
    {
        
    }

  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send("no task found");
  }

  task.status = req.body.status;
  await task.save();
  res.status(200).send(task);
});

// Invite a user for collaboration
router.post("/:id/inviteUser", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send();
  }

  const userId = req.body.userId;
  task.assignedUsers.push(userId);
  await task.save();

  // Update the user's model to include this task
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  user.tasks.push(task._id);
  await user.save();

  res.status(200).send(task);
});

module.exports = router;
