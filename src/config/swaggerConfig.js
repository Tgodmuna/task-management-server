const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "task Management API",
      version: "1.0.0",
      description: "Backend API documentation",
    },
  },
  apis: ["../../src/app.js"],
  verbose: true,
  encoding: "",
  failOnErrors: false,
  format: "",
  swaggerDefinition: undefined,
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
