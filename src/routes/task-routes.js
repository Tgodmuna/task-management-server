// @ts-nocheck
const express = require("express");
const Task = require("../model/taskModel");
const User = require("../model/userModel");
const tryCatchMiddleware = require("../middlewares/try-catch.middleware");
const userModel = require("../model/userModel");

const router = express.Router();

// Create a new task
router.post(
  "/createTask",
  tryCatchMiddleware(async (req, res) => {
    const { newTask } = req.body;
    console.log({ newTask });

    // Validate required fields
    if (!newTask.taskName || !newTask.estimation || !newTask.type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find people if provided
    const { people } = newTask;
    const peoples = people.length
      ? await userModel.find({ email: { $in: people.map((v) => v) } })
      : [];

    console.log({ peoples });

    // Create the task
    const task = new Task({ ...newTask, people: peoples.map((p) => p._id) });

    // Validate task schema
    const taskInstance = new Task(task);
    try {
      await taskInstance.validate();
    } catch (err) {
      logger.error("Task validation failed", { error: err });

      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }

    if (!task) return res.status(500).json({ error: "Task creation failed" });

    const userId = req.user.id;

    // Update the user's model to include this task
    const user = await User.findById(userId).populate("tasks");
    if (!user) {
      return res.status(404).send({ error: "unable to associate task with user" });
    }

    await task.save();
    user.tasks.push(task._id);
    await user.save();

    return res.status(201).json({ task, message: "Task created successfully" });
  })
);

// Read all tasks
router.get(
  "/readTasks",
  tryCatchMiddleware(async (req, res) => {
    const tasks = await Task.find().populate("people", { name: 1, email: 1, profileUrl: 1 });
    if (!tasks) return res.status(404).json([]);

    return res.status(200).json({ tasks, message: "tasks retrirevd successfully" });
  })
);

// Read a single task by ID
router.get("/singlTask/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.sendStatus(400).send("no parameter provided");

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Task ID" });

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).send("no task found");
  }
  return res.status(200).json(task);
});

// Update a task by ID
router.patch("/updateTask/:id", async (req, res) => {
  if ( !req.body ) return res.status( 400 ).send( "invalid request body" );
  
  console.log(req.body)

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "taskName",
    "description",
    "estimation",
    "type",
    "people",
    "status",
    "priority",
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send("no task found,unable to update");
  }

  updates.forEach((update) => (task[update] = req.body[update]));
  await task.save();
  return res.status(200).send(task);
});

// Delete a task by ID
router.delete("/delete/:id", async (req, res) => {
  if (!req.params.id) return res.sendStatus(400).send("no parameter provided");

  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).send("no task found,unable to delete");
  }
  return res.status(200).send(task);
});

// Track date estimation
router.post("/track/:id/trackEstimation", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send();
  }
  task.estimation = req.body.estimation;
  await task.save();
  res.status(200).send(task);
});

// Update task status
router.patch("/:id/updateStatus", async (req, res) => {
  if (!req.body.status) {
    return res.status(400).send({ error: "Status is required" });
  }

  if (!req.params.id) return res.sendStatus(400).send("no parameter provided");

  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).send("no task found,unable to update status");
  }

  task.status = req.body.status;
  await task.save();
  return res.status(200).send(task);
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
