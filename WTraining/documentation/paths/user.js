module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created'
        },
        422: {
          description: 'validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'The email must be valid and must belong to the Wolox email domain.',
                internal_code: 'validation_error'
              }
            }
          }
        },
        409: {
          description: 'conflict error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Email is already in use.',
                internal_code: 'conflict_error'
              }
            }
          }
        }
      }
    }
  }
};
