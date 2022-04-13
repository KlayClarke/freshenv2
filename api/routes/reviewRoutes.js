var express = require("express");
var router = express.Router();
const review_controller = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/verifyToken");

router
  .route("/")
  .get(logUrl, review_controller.review_list)
  .post(verifyToken, review_controller.review_create);

router
  .route("/:reviewid")
  .get(logUrl, review_controller.review_detail)
  .delete(verifyToken, review_controller.review_delete);

module.exports = router;
