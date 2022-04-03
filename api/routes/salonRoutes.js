const express = require("express");
const router = express.Router();
const salon_controller = require("../controllers/salonController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", salon_controller.salon_list);

router.get("/:salonid", salon_controller.salon_detail);

router.post("/", verifyToken, salon_controller.salon_create);

router.delete("/:salonid", verifyToken, salon_controller.salon_delete);

module.exports = router;
