/**@module index */

//DEPENDENCIES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//For work with JSON
app.use(express.json());

// Routes
/**
 * Users router
 * @typedef {Router} usersRoute
 */
const usersRoute = require("./routes/users");
/**
 * Users router
 * @typedef {Router} messagesRoute
 */
const messagesRoute = require("./routes/messages");
/**
 * Users router
 * @typedef {Router} serversRoute
 */
const serversRoute = require("./routes/servers");
/**
 * Users router
 * @typedef {Router} actionsRoute
 */
const actionsRoute = require("./routes/actions");
/**
 * Users router
 * @typedef {Router} backgroundsRoute
 */
const backgroundsRoute = require("./routes/backgrounds");

//Mongoose
/**
 * Mongoose connection
 * @function
 * @param {string} process.env.DATABASE_URL
 * @param {callback}
 * @returns {void}
 */
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use("/users", usersRoute);
app.use("/messages", messagesRoute);
app.use("/servers", serversRoute);
app.use("/actions", actionsRoute);
app.use("/backgrounds", backgroundsRoute);

// This is for the port (listen to port 3000 or the environment variable we set on the machine)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
