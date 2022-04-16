const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/sort/:sortby").get(salon_controller.salon_explore_get);

router
  .route("/create")
  .get(salon_controller.salon_create_get)
  .post(salon_controller.salon_create_post);

router
  .route("/:salonid")
  .get(salon_controller.salon_detail_get)
  .post(salon_controller.salon_update_post);

router
  .route("/:salonid/update")
  .get(salon_controller.salon_update_get)
  .post(salon_controller.salon_update_post);

router
  .route("/:salonid/delete")
  .get(salon_controller.salon_delete_get)
  .post(salon_controller.salon_delete_post);

module.exports = router;
