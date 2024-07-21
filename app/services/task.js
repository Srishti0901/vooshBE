const TaskRepository = require("../repository/task.repository");

const createTask = async (data) => {
  return TaskRepository.create(data);
};

const updateTask = async (data) => {
  await TaskRepository.update(data);
};

const getAllTasks = async ({ userId }) => {
  return await TaskRepository.getAll(userId);
};

const deleteTask = async ({ taskId }) => {
  await TaskRepository.delete(taskId);
};

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
};
