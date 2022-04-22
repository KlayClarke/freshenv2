const express = require("express");
const router = express.Router();
const async = require("async");
const Salon = require("../models/salon");
const salon_controller = require("../controllers/salonController");

router.get("/", (req, res) => {
  res.render("home");
});

// salons api call
router.route("/api/salons").get(salon_controller.get_salon_list);

module.exports = router;
