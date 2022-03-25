var express = require("express");
var router = express.Router();
const review_controller = require("../controllers/reviewController");

router.get("/", review_controller.review_list);

router.get("/:reviewid", review_controller.review_detail);

module.exports = router;
