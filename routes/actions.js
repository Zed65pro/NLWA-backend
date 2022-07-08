const express = require("express");
const router = express.Router();

const actionModel = require("../models/action");

// MIDDLEWARE for getting action
const getAction = async (req, res, next) => {
    let action;
  
    try {
      action = await actionModel.findById(req.params.id);
      if (!action) return res.status(404).json({ message: "action not found." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
    res.action = action;
    next();
  };
  
  //GET ALL
  router.get("/", async (req, res) => {
    try {
      const actions = await actionModel.find();
      res.json(actions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST
  router.post("/", async (req, res) => {
    const action = new actionModel({
      title: req.body.title,
      content: req.body.content,
    });
  
    try {
      const newAction = await action.save();
      res.status(201).json(newAction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // GET - BY ID
  router.get("/:id", getAction, (req, res) => {
    res.json(res.action);
  });
  
  // PUT
  router.put("/:id", getAction, async (req, res) => {
    res.action.title = req.body.title;
    res.action.content = req.body.content;
  
    try {
      const updatedAction = await res.action.save();
      res.json(updatedAction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE
  router.delete("/:id", getAction, async (req, res) => {
    try {
      await res.action.remove();
      res.send("Deleted action.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router;