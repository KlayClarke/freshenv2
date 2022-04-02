var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/", user_controller.user_list);

router.get("/:userid", user_controller.user_detail);

router.post("/", user_controller.user_create);

router.post("/login", user_controller.user_login);

router.delete("/:userid", user_controller.user_delete);

module.exports = router;
