import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create_and_authenticate_user'
import { prisma } from '@/lib/prisma'

describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possível fazer checkIn em uma academia', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Cria uma academia direto pelo prisma. Diego disse que essa forma, sem ser uma rota, não é muito boa, pois se um dia tivermos que inserir um outro campo, por exemplo, vamos ter que trocar em todos os testes.
    const gym = await prisma.gym.create({
      data: {
        title: 'Academia Robério',
        latitude: -14.4095261,
        longitude: -51.31668,
      },
    })

    // Faz a chamada para fazer checkin
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -14.4095261,
        longitude: -51.31668,
      })

    // Valido se está retornando corretamente
    expect(response.statusCode).toEqual(201)
  })
})
