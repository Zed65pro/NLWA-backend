require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Routes
const usersRoute = require("./routes/users");
const messagesRoute = require("./routes/messages");
const serversRoute = require("./routes/servers");
const actionsRoute = require("./routes/actions");
const backgroundsRoute = require("./routes/backgrounds");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use("/users", usersRoute);
app.use("/messages", messagesRoute);
app.use("/servers", serversRoute);
app.use("/actions", actionsRoute);
app.use("/backgrounds", backgroundsRoute);

// This is for the port (listen to port 3000 or the environment variable we set on the machine)
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
