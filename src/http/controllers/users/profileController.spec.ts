import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create_and_authenticate_user'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possível obter o perfil do usuário', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Faz a chamada para obter o perfil com o token
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Valido se está retornando corretamente
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'adv.roberiomg@gmail.com',
      }),
    )
  })
})
