const express = require("express");
const cors = require("cors");
const config = require("./config/index");
const app = express();
require("dotenv").config();
const isAuthenticated = require("./app/controllers/auth/index");
const connectDB = require("./lib/connections");
const routes = require("./app/routes/index");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

connectDB();
// Routes
app.use("/", routes.oauth);
app.use("/user", routes.user);
app.use("/user/task", isAuthenticated.validateJwt, routes.task);

app.listen(config.server.PORT, () => {
  console.log(`Server is running on port ${config.server.PORT}`);
});

module.exports = app;
