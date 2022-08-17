/**@module controllers/servers */

/**@typedef {mongoose.Model}*/
const serverModel = require("../models/server");

module.exports = {
  /**
   * Middleware function which gets a server based on it's id
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {Function} next -next()
   * @returns {Response}
   */
  getServer: async (req, res, next) => {
    let server;

    try {
      server = await serverModel.findById(req.params.id);
      if (!server)
        return res.status(404).json({ message: "Server not found." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    res.server = server;
    next();
  },
  /**
   * Controller function to get all servers from database
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  getAllServers: async (req, res) => {
    try {
      const servers = await serverModel.find();
      res.json(servers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  /**
   * Controller function to get all post a server
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  postServer: async (req, res) => {
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
  },
  /**
   * Controller function to get a server by id
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  getServerById: (req, res) => {
    res.json(res.server);
  },
  /**
   * Controller function to update a server
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @returns {Response}
   */
  updateServer: async (req, res) => {
    res.server.title = req.body.title;
    res.server.status = req.body.status;

    try {
      const updatedServer = await res.server.save();
      res.json(updatedServer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  /**
   * Controller function to delete a server
   * @param {Request} req -Request
   * @param {Response} res -Response
   * @param {Function} next -next()
   * @returns {Response}
   */
  deleteServer: async (req, res) => {
    try {
      await res.server.remove();
      res.send("Deleted server.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
