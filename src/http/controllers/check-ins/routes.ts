import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createCheckInsController } from './createCheckInsController'
import { validateCheckInsController } from './validateCheckInsController'
import { historyCheckInsController } from './historyCheckInsController'
import { metricsCheckInsController } from './metricsCheckInsController'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // Rotas daqui para baixo somente usuários autenticados podeão chamar
  app.get('/check-ins/hitory', historyCheckInsController)
  app.get('/check-ins/metrics', metricsCheckInsController)

  app.post('/gyms/:gymId/check-ins', createCheckInsController)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInsController,
  )
}
