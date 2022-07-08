const express = require("express");
const router = express.Router();

const backgroundModel = require("../models/background");

// MIDDLEWARE for getting background
const getBackground = async (req, res, next) => {
    let background;
  
    try {
      background = await backgroundModel.findById(req.params.id);
      if (!background) return res.status(404).json({ message: "background not found." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
    res.background = background;
    next();
  };
  
  //GET ALL
  router.get("/", async (req, res) => {
    try {
      const backgrounds = await backgroundModel.find();
      res.json(backgrounds);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST
  router.post("/", async (req, res) => {
    const background = new backgroundModel({
      title: req.body.title,
      content: req.body.content,
    });
  
    try {
      const newBackground = await background.save();
      res.status(201).json(newBackground);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // GET - BY ID
  router.get("/:id", getBackground, (req, res) => {
    res.json(res.background);
  });
  
  // PUT
  router.put("/:id", getBackground, async (req, res) => {
    res.background.title = req.body.title;
    res.background.content = req.body.content;
  
    try {
      const updatedBackground = await res.background.save();
      res.json(updatedBackground);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE
  router.delete("/:id", getBackground, async (req, res) => {
    try {
      await res.background.remove();
      res.send("Deleted background.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router;