const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");

router
  .route("/join")
  .get(user_controller.user_join_get)
  .post(user_controller.user_join_post);

router
  .route("/login")
  .get(user_controller.user_login_get)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user_controller.user_login_post
  );

router.get("/account");

router.get("/logout", user_controller.user_logout_post);

module.exports = router;
