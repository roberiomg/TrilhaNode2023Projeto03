import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  // Cria o usuário
  await request(app.server).post('/users').send({
    name: 'Robério',
    email: 'adv.roberiomg@gmail.com',
    password: '123456',
  })

  // Faz login
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'adv.roberiomg@gmail.com',
    password: '123456',
  })

  // Pega o token
  const { token } = authResponse.body

  return {
    token,
  }
}
