const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .get(salon_controller.salon_list)
  .post(salon_controller.salon_create);

router
  .route("/:salonid")
  .get(salon_controller.salon_detail)
  .post(salon_controller.salon_update);

module.exports = router;
