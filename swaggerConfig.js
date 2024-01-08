const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Node.js - first REST API",
      description:
        "**API documentation** <p>Стек технологій, що використовується у проєкті: <p>Node.js - середовище виконання JavaScript на сервері. <p>Express.js - фреймворк для розробки веб-додатків на Node.js. <p>MongoDB - NoSQL база даних. <p>Mongoose - бібліотека для роботи з MongoDB у Node.js. ",
    },
    basePath: "/",
  },
  servers: [
    {
      url: "http://localhost:3007/",
    },
  ],
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
