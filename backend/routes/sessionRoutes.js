// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession
} = require("../controllers/sessionController");

const verifyToken = require("../middleware/verifyToken");

// POST /api/sessions/create
router.post("/create", verifyToken, createSession);

// GET /api/sessions
router.get("/", verifyToken, getAllSessions);

// GET /api/sessions/:id
router.get("/:id", verifyToken, getSessionById);

// PUT /api/sessions/:id
router.put("/:id", verifyToken, updateSession);

module.exports = router;
