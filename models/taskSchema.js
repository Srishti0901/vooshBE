const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  name: String,
  description: String,
  status: {
    type: String,
    enum: ["InProgress", "Completed", "New Order"],
    default: "SCHEDULED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
