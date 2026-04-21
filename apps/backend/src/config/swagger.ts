import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gontobbo API",
      version: "1.0.0",
      description: "Travel booking platform API for Gontobbo mobile & web apps",
      contact: {
        name: "Gontobbo Team",
        url: "https://www.gontobbo.co",
      },
    },
    servers: [
      {
        url: "/api",
        description: "API base path",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: { type: "object" },
            message: { type: "string" },
          },
        },
        ApiError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "integer" },
                message: { type: "string" },
                details: { type: "string" },
              },
            },
          },
        },
        PaginatedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: { type: "array", items: {} },
            meta: {
              type: "object",
              properties: {
                total: { type: "integer" },
                page: { type: "integer" },
                limit: { type: "integer" },
                totalPages: { type: "integer" },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    "./apps/backend/src/modules/**/*.routes.ts",
    "./apps/backend/dist/modules/**/*.routes.js",
    "./src/modules/**/*.routes.ts",
    "./dist/modules/**/*.routes.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
