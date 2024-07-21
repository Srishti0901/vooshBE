const router = require("express").Router();
const {
  apiController: { user: userController },
  authController,
} = require("../controllers/index");

router.route("/login").post(userController.login);

router.route("/signup").post(userController.signup);

module.exports = router;
