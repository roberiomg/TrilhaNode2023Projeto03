import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User (e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possível cadastrar um usuário', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Robério',
      email: 'adv.roberiomg@gmail.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
  })
})
