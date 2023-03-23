import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { UserUseCase } from './userUseCase'

describe('User Use Case', () => {
  it('Deve ser possível gerar hash da senha do usuário assim que ele se cadastrar', async () => {
    const userUseCase = new UserUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await userUseCase.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
