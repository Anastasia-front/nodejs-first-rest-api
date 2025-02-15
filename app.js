const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const { routerAuth, routerContacts } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: "http://localhost:3000", 
  methods: "GET, POST, PUT, DELETE, OPTIONS", 
  allowedHeaders: "Authorization, Content-Type", 
  credentials: true, 
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/user", routerAuth);
app.use("/api/contact", routerContacts);

app.use((_, res) => {
  res.status(404).json({ message: "not found" });
});

app.use((err, _, res) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
