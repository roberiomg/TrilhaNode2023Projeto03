import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UserUseCase } from './userUseCase'

let usersRepository: InMemoryUsersRepository
let sut: UserUseCase

describe('User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserUseCase(usersRepository)
  })
  it('Deve ser possível cadastrar um usuário', async () => {
    const { user } = await sut.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Deve ser possível gerar hash da senha do usuário assim que ele cadastrar', async () => {
    const { user } = await sut.execute({
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
    const email = 'adv.roberiomg@gmail.com'

    await sut.execute({
      name: 'Teste',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Teste',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
