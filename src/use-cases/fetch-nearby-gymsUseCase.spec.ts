import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gymsUseCase'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Buscar academias próximas Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Deve ser possível buscar uma academia próxima', async () => {
    await gymsRepository.create({
      title: 'Academia perto',
      description: null,
      phone: null,
      latitude: -20.7595183,
      longitude: -41.5312591,
    })

    await gymsRepository.create({
      title: 'Academia longe',
      description: null,
      phone: null,
      latitude: -20.7914635,
      longitude: -41.3929746,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.7595183,
      userLongitude: -41.5312591,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Academia perto' })])
  })
})
