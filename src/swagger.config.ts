import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API for managing tasks",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: `${process.env.URL_SWAGGER}`,
        description: "Dev stage server",
      },
    ],
  },
  security: [{ bearerAuth: [] }],
  apis: ["./dist/server.js", "./src/server.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
