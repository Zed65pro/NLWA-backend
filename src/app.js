const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");

// dotenv configuration
require("dotenv").config({ path: "./src/config/.env" });

// App configuration
const app = express();

// Logging configuration
app.use(morgan("dev"));

// Body parser and json configuration
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//Connect to MongoDB
require("./config/database")();

// Passport configuration
require("./config/passport")(passport);

// Session configuration - (has to be done before passport middleware initialization and session)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/servers", require("./routes/servers"));
app.use("/messages", require("./routes/messages"));

// PORT configuration
app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}...`)
);

// status 500- server error
// status 404- not found
// status 400- user input error
// status 201- post success
// status 200- successful
