import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticateController'
import { userController } from './userController'
import { profileController } from './profileController'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', userController) // Cria um usuário
  app.post('/sessions', authenticateController) // Faz login

  // Daqui para baixo são rotas que só pederão ser chamadas se o usuário estiver autenticado!

  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
