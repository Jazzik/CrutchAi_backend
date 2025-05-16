export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CrutchAI Backend API',
      version: '1.0.0',
      description: 'API documentation for CrutchAI backend (TypeScript Edition)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
