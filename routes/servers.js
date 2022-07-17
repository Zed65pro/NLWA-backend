const express = require("express");
const router = express.Router();

const serverModel = require("../models/server");

// Validation middlware
const { validate } = require("../middlewares/validate");
const { validateServer } = require("../middlewares/serverValidation");

// MIDDLEWARE for getting server
const getServer = async (req, res, next) => {
  let server;

  try {
    server = await serverModel.findById(req.params.id);
    if (!server) return res.status(404).json({ message: "Server not found." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.server = server;
  next();
};

//GET ALL
router.get("/", async (req, res) => {
  try {
    const servers = await serverModel.find();
    res.json(servers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
router.post("/", validateServer, validate, async (req, res) => {
  const server = new serverModel({
    title: req.body.title,
    status: req.body.status,
  });

  try {
    const newServer = await server.save();
    res.status(201).json(newServer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - BY ID
router.get("/:id", getServer, (req, res) => {
  res.json(res.server);
});

// PUT
router.put("/:id", validateServer, validate, getServer, async (req, res) => {
  res.server.title = req.body.title;
  res.server.status = req.body.status;

  try {
    const updatedServer = await res.server.save();
    res.json(updatedServer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", getServer, async (req, res) => {
  try {
    await res.server.remove();
    res.send("Deleted server.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
