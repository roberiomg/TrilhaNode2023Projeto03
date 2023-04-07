import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  // Cria o usuário
  await prisma.user.create({
    data: {
      name: 'Robério Mariano Gonçalves',
      email: 'adv.roberiomg@gmail.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
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
