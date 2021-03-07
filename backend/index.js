require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const routerv1 = require("./routes/routerv1");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for User Finder App",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from userfinderapi.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Ahmad Nuril Firdaus",
      url: "https://ahmadnurilfirdaus.github.io",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(bodyParser.json());
app.use("/Images", express.static("images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", routerv1);

app.listen(port, () => console.log(`Server running on port ${port}`));
