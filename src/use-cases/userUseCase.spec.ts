import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UserUseCase } from './userUseCase'

describe('User Use Case', () => {
  it('Deve ser possível cadastrar um usuário', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userUseCase = new UserUseCase(usersRepository)

    const { user } = await userUseCase.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Deve ser possível gerar hash da senha do usuário assim que ele cadastrar', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userUseCase = new UserUseCase(usersRepository)

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

  it('Não deve ser possível criar um usuário com email repetido', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userUseCase = new UserUseCase(usersRepository)

    const email = 'adv.roberiomg@gmail.com'

    await userUseCase.execute({
      name: 'Teste',
      email,
      password: '123456',
    })

    await expect(() =>
      userUseCase.execute({
        name: 'Teste',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
