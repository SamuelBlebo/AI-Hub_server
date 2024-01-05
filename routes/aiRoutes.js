const express = require("express");

const {
  getAis,
  getAi,
  createAi,
  deleteAi,
  updateAi,
} = require("../controllers/aiController");

const router = express.Router();

// get all AIs
router.get("/", getAis);

// get a single AI
router.get("/:id", getAi);

// Post an new AI
router.post("/", createAi);

// Delete an AI
router.delete("/:id", deleteAi);

// Update an AI
router.patch("/:id", updateAi);

module.exports = router;
