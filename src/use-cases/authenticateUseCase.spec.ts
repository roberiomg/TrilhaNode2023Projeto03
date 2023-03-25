import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticateUseCase'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Deve ser possível autenticar um usuário', async () => {
    await usersRepository.create({
      name: 'Robério Mariano Gonçalves',
      email: 'adv.roberiomg@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'adv.roberiomg@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Não Deve ser possível autenticar com email errado', async () => {
    expect(() =>
      sut.execute({
        email: 'adv.roberiomg@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Não Deve ser possível autenticar com password errado', async () => {
    await usersRepository.create({
      name: 'Robério Mariano Gonçalves',
      email: 'adv.roberiomg@gmail.com',
      password_hash: await hash('123456', 6),
    })
    expect(() =>
      sut.execute({
        email: 'adv.roberiomg@gmail.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
