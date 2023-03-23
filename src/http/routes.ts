import { FastifyInstance } from 'fastify'
import { userController } from './controllers/userController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userController)
}
