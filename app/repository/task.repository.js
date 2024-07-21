const Task = require("../../models/taskSchema");
const mongoose = require("mongoose");

const create = (data) => {
  return new Task(data).save();
};

const update = async ({
  taskId,
  userId,
  newName,
  newStatus,
  newDescription,
}) => {
  const filterQuery = {
    _id: taskId,
    userId,
  };
  const updateQuery = {};
  if (newName !== undefined) {
    updateQuery.name = newName;
  }
  if (newDescription !== undefined) {
    updateQuery.description = newDescription;
  }
  if (newStatus !== undefined) {
    updateQuery.status = newStatus;
  }
  const ans = await Task.updateOne(filterQuery, { $set: updateQuery });
};

const getAll = async (userId) => {
  const allTasks = await Task.find({ userId });
  return allTasks;
};

const deleteTask = async (taskId) => {
  await Task.deleteOne({ _id: taskId });
};

module.exports = {
  create,
  update,
  getAll,
  delete: deleteTask,
};
