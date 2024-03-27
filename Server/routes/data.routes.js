const express = require("express");
const { dataModel } = require("../model/data.model");
const dataRouter = express.Router();

// Adding new data
dataRouter.post("/add", async (req, res) => {
  const { type, coordinates } = req.body;
  try {
    const geodata = new dataModel({ type, coordinates });
    await geodata.save();
    res.json({ "msg": "data has been added" });
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
});

module.exports = {
  dataRouter
};
