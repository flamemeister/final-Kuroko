const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Kuroko API',
        version: '1.0.0',
        description: 'Kuroko API',
      },
      servers: [
        {
          url: 'http://localhost:8080',
          description: 'Development Server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Путь к вашим контроллерам
  };
  

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
