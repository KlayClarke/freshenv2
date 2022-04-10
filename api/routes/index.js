const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/flash", (req, res) => {
  req.flash("info", "Flash is back");
  res.redirect("/");
});

module.exports = router;
