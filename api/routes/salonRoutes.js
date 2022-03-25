const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");

router.get("/", salon_controller.salon_list);

router.get("/:salonid", salon_controller.salon_detail);

module.exports = router;
