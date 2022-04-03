var express = require("express");
var router = express.Router();
const review_controller = require("../controllers/reviewController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", review_controller.review_list);

router.get("/:reviewid", review_controller.review_detail);

router.post("/", verifyToken, review_controller.review_create);

router.delete('/"reviewid', verifyToken, review_controller.review_delete);

module.exports = router;
