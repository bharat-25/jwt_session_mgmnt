const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Instagram Application',
        version: '1.0.0',
        description:
          'These all APIs are dummy for my practice purpose.',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
      },
      servers: [
        {
          url: 'http://localhost:4001',
          description: 'Development server',
        },
      ],
    }

export {swaggerDefinition};