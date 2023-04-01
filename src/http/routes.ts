import { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticateController'
import { userController } from './controllers/userController'
import { profileController } from './controllers/profileController'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userController) // Cria um usuário
  app.post('/sessions', authenticateController) // Faz login

  // Daqui para baixo são rotas que só pederão ser chamadas se o usuário estiver autenticado!

  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
