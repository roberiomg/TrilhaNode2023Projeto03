import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create_and_authenticate_user'
import { prisma } from '@/lib/prisma'

describe('CheckIn History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possível listar o histórico de checkIn', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Academia Robério',
        latitude: -14.4095261,
        longitude: -51.31668,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_Id: gym.id,
          user_Id: user.id,
        },
        {
          gym_Id: gym.id,
          user_Id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/hitory')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_Id: gym.id,
        user_Id: user.id,
      }),
      expect.objectContaining({
        gym_Id: gym.id,
        user_Id: user.id,
      }),
    ])
  })
})
