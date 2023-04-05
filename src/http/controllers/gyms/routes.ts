import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { searchGymsController } from './searchGymsController'
import { nearbyGymsController } from './nearbyGymsController'
import { createGymController } from './createGymsController'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // Rotas daqui para baixo somente usuários autenticados podeão chamar
  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', nearbyGymsController)

  app.post('/gyms', createGymController)
}
