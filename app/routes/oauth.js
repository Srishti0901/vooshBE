const router = require("express").Router();
const { authController } = require("../controllers/index");

router.route("/auth/google").get(authController.googleLoginStart);
router.route("/auth/google/callback").get(authController.oauthLoginCallback);

module.exports = router;
