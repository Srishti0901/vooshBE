const taskSchemaValidation = require("../../schema/task.schema");
const { task: taskService, createResponse } = require("../../services/index");

const createTask = async (req, res) => {
  try {
    const { value: validRequestData, error: invalidRequest } =
      taskSchemaValidation.createTask.validate(req.body, {
        stripUnknown: true,
      });
    if (invalidRequest) {
      throw new Error(invalidRequest.message);
    }
    const response = await taskService.createTask(validRequestData);
    return res.status(200).json(createResponse(true, null, response));
  } catch (error) {
    return res.status(404).json(createResponse(false, error.message));
  }
};

const updateTask = async (req, res) => {
  try {
    const { value: validRequestData, error: invalidRequest } =
      taskSchemaValidation.updateTask.validate(req.body, {
        stripUnknown: true,
      });
    if (invalidRequest) {
      throw new Error(invalidRequest.message);
    }
    await taskService.updateTask(validRequestData);
    return res.status(200).json(createResponse(true, null, true));
  } catch (error) {
    return res.status(404).json(createResponse(false, error.message));
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { value: validRequestData, error: invalidRequest } =
      taskSchemaValidation.getAllTasks.validate(req.query, {
        stripUnknown: true,
      });
    if (invalidRequest) {
      throw new Error(invalidRequest.message);
    }
    const response = await taskService.getAllTasks(validRequestData);
    return res.status(200).json(createResponse(true, null, response));
  } catch (error) {
    return res.status(404).json(createResponse(false, error.message));
  }
};

const deleteTask = async (req, res) => {
  try {
    const { value: validRequestData, error: invalidRequest } =
      taskSchemaValidation.deleteTask.validate(req.query, {
        stripUnknown: true,
      });
    if (invalidRequest) {
      throw new Error(invalidRequest.message);
    }
    await taskService.deleteTask(validRequestData);
    return res.status(200).json(createResponse(true, null, true));
  } catch (error) {
    return res.status(404).json(createResponse(false, error.message));
  }
};

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
};
