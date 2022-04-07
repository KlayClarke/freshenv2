const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("home");
});

router
  .route("/join")
  .get(user_controller.user_join_form)
  .post(user_controller.user_create);

router
  .route("/login")
  .get(user_controller.user_login_form)
  .post(user_controller.user_login);

module.exports = router;
