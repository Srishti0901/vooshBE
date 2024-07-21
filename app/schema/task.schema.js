const joi = require("joi");

const createTask = joi.object({
  userId: joi.string().hex().length(24).required(),
  name: joi.string().required(),
  description: joi.string().required(),
  status: joi.string().valid("InProgress", "Completed", "New Order").required(),
});

const updateTask = joi.object({
  taskId: joi.string().hex().length(24).required(),
  userId: joi.string().hex().length(24).required(),
  newName: joi.string(),
  newStatus: joi.string(),
  newDescription: joi.string(),
});

const getAllTasks = joi.object({
  userId: joi.string().hex().length(24).required(),
});

const deleteTask = joi.object({
  taskId: joi.string().hex().length(24).required(),
});

const taskSchemaValidation = {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
};

module.exports = taskSchemaValidation;
