var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/join")
  .get(user_controller.user_join_form)
  .post(user_controller.user_create);

router
  .route("/login")
  .get(user_controller.user_login_form)
  .post(user_controller.user_login);

module.exports = router;
