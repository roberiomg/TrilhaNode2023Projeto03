import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create_and_authenticate_user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possível encontrar uma academia próxima', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym Perto',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -20.7595183,
        longitude: -41.5312591,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym Longe',
        description: 'Some description.',
        phone: '1199999999',
        latitude: -20.7914635,
        longitude: -41.3929746,
      })

    // Busca a academia perto
    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.7595183,
        longitude: -41.5312591,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym Perto',
      }),
    ])
  })
})
