const Ai = require("../models/aiModel");

const mongoose = require("mongoose");

//get all AIs

const getAis = async (req, res) => {
  const ais = await Ai.find({}).sort({ name: -1 });

  res.status(200).json(ais);
};

// get a single AI
const getAi = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such AI" });
  }

  const ai = await Ai.findById(id);

  if (!ai) {
    return res.status(404).json({ error: "No such AI" });
  }

  res.status(200).json(ai);
};

// create a new AI
const createAi = async (req, res) => {
  const { name, description, link, category, price } = req.body;

  try {
    const ai = await Ai.create({ name, description, link, category, price });
    res.status(200).json(ai);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an AI

const deleteAi = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such AI" });
  }

  const ai = await Ai.findOneAndDelete({ _id: id });

  if (!ai) {
    return res.status(400).json({ error: "No Such AI" });
  }

  res.status(200).json("Deleted Successfully");
};

// Updating a ai

const updateAi = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such AI" });
  }

  const ai = await Ai.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!ai) {
    return res.status(400).json({ error: "No such AI" });
  }

  res.status(200).json("Updated Successfully");
};

module.exports = {
  getAis,
  getAi,
  createAi,
  deleteAi,
  updateAi,
};
