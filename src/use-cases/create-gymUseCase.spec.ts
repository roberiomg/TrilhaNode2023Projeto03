import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gymUseCase'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('Deve ser possível cadastrar uma academia', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Robério',
      description: null,
      phone: null,
      latitude: -14.4095261,
      longitude: -51.31668,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
