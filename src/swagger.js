import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
      description:
        "Nalanda Library Management System \n To access authenticated routes, ensure you are logged in and have a valid token. After completing the login process, use the Authorize feature to set the token.For Admin Access, you can use the following credentials:Email: admin@gmail.com Password: admin",
    },
    servers: [
      {
        url: `http://localhost:3000/api/v1`,
        description: "Development server",
      },
      {
        url:'https://nalanda-library-management-system-8iza.onrender.com/api/v1',
        description: "deployed server",
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },

  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
