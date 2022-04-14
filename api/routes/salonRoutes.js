const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");
const { verifyToken } = require("../middleware/verifyToken");

router
  .route("/")
  .get(salon_controller.salon_explore_get)
  .post(salon_controller.salon_create_post);

router.get("/create", salon_controller.salon_create_get);

router
  .route("/:salonid")
  .get(salon_controller.salon_detail_get)
  .post(salon_controller.salon_update_post);

module.exports = router;
