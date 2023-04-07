import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create_and_authenticate_user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possível criar uma academia', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    // Faz a chamada para criar a academia
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia Gelsiane',
        description: 'Bora pra academia',
        phone: '1122222222',
        latitude: -14.4095261,
        longitude: -51.31668,
      })

    // Valido se está retornando corretamente
    expect(response.statusCode).toEqual(201)
  })
})
