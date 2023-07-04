const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { routerAuth, routerContacts } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", routerAuth);
app.use("/api/contacts", routerContacts);

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
