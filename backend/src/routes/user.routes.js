const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

module.exports = router;
