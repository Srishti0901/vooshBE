const router = require("express").Router();
const {
  apiController: { task: taskController },
} = require("../controllers/index");

router.route("/create").post(taskController.createTask);

router.route("/update").patch(taskController.updateTask);

router.route("/delete").delete(taskController.deleteTask);

router.route("/get").get(taskController.getAllTasks);

module.exports = router;
