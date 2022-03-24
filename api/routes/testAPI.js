const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is still working properly");
});

module.exports = router;
