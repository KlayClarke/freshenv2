const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", logUrl, salon_controller.salon_explore_get);

router.get("/create", logUrl, salon_controller.salon_create_get);

router
  .route("/:salonid")
  .get(logUrl, salon_controller.salon_detail_get)
  .post(salon_controller.salon_update_post);

module.exports = router;
