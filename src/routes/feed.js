const express = require("express");
const { User } = require("../Schemas");

const feedRoute = express.Router();

feedRoute.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = feedRoute;
