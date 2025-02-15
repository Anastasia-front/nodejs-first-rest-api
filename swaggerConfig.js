const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.3",
      title: "Node.js - first REST API",
      description:
        "**API documentation**<p>This project utilizes the following technology stack:</p><ul><li><strong>Node.js:</strong> JavaScript runtime environment on the server.</li><li><strong>Express.js:</strong> Framework for developing web applications on Node.js.</li><li><strong>MongoDB:</strong> NoSQL database.</li><li><strong>Mongoose:</strong> Library for working with MongoDB у Node.js.</li></ul> ",
    },
    contact: {
      name: "Anastasia",
      url: "https://github.com/Anastasia-front/nodejs-phonebook-rest-api",
    },
    basePath: "/",
  },
  consumes: ["application/json", "multipart/form-data"],
  produces: ["application/json"],
  servers: [
    {
      url: "https://contacts-backend-eikd.onrender.com/",
      description: "Production",
    },
    { url: "http://localhost:3007", description: "Development" },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authorization endpoints",
    },
    {
      name: "Contacts",
      description: "Contacts endpoints",
    },
  ],
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
