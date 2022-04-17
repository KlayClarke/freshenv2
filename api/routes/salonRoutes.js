const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", function (req, res, next) {
  res.redirect("explore/sort_by_name");
});

router
  .route("/create")
  .get(salon_controller.salon_create_get)
  .post(salon_controller.salon_create_post);

router.route("/:sortby").get(salon_controller.salon_explore_get);

router
  .route("/detail/:salonid")
  .get(salon_controller.salon_detail_get)
  .post(salon_controller.salon_update_post);

router
  .route("/detail/:salonid/update")
  .get(salon_controller.salon_update_get)
  .post(salon_controller.salon_update_post);

router
  .route("/detail/:salonid/delete")
  .get(salon_controller.salon_delete_get)
  .post(salon_controller.salon_delete_post);

module.exports = router;
