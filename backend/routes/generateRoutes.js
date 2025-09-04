// routes/generateRoutes.js
const express = require("express");
const router = express.Router();
const { generateComponent } = require("../controllers/generateController");
const verifyToken = require("../middleware/verifyToken");

// POST /api/generate
// router.post("/", verifyToken, generateComponent);
router.post("/", generateComponent);

module.exports = router;
