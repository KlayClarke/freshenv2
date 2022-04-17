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

router.get("/account", user_controller.user_account_get);

router.post(
  "/account/update",
  user_controller.user_account_password_update_post
);

router.post("/account/delete", user_controller.user_account_delete_post);

router.get("/logout", user_controller.user_logout_post);

module.exports = router;
