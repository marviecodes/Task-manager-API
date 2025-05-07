const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const asyncHandler = require("express-async-handler");

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, length: tasks.length, tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({
    success: true,
    data: newTask,
  });
});

const getTask = asyncHandler(async (req, res, next) => {
  const taskID = req.params.id;
  const task = await Task.findById(taskID);

  if (!task) {
    res.status(404);
    throw new Error("Task not found, invalid task ID.");
  }

  res.status(200).json({ success: true, task });
});

const updateTask = asyncHandler(async (req, res) => {
  const taskID = req.params.id;

  const updates = req.body;

  const task = await Task.findByIdAndUpdate(taskID, updates, {
    new: true, // return the updated document
    runValidators: true, // validate against schema
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found, invalid Task ID");
  }

  res.status(200).json({ success: true, task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const deletedTask = await Task.findByIdAndDelete(taskID);

  if (!deletedTask) {
    res.status(404);
    throw new Error("Task not found, invalid Task ID");
  }

  res.status(200).json({ success: true, deletedTask });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
