import { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticateController'
import { userController } from './controllers/userController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userController)
  app.post('/sessions', authenticateController)
}
