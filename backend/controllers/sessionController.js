// controllers/sessionController.js
const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const { sessionName } = req.body;
    const userId = req.user.id;

    const session = await Session.create({
      userId,
      sessionName,
      chatHistory: [],
      code: { jsx: "", css: "" },
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: "Session creation failed", details: err.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions", details: err.message });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch session", details: err.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { chatHistory, code } = req.body;

    const updated = await Session.findByIdAndUpdate(
      id,
      {
        chatHistory,
        code,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update session", details: err.message });
  }
};
