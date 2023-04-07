import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gymsUseCase'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Buscar academias Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Deve ser possível buscar uma academia', async () => {
    await gymsRepository.create({
      title: 'Academia Robério',
      description: null,
      phone: null,
      latitude: -14.4095261,
      longitude: -51.31668,
    })

    await gymsRepository.create({
      title: 'Academia Gelsiane',
      description: null,
      phone: null,
      latitude: -14.4095261,
      longitude: -51.31668,
    })

    const { gyms } = await sut.execute({
      query: 'Gelsiane',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Gelsiane' }),
    ])
  })

  it('Deve ser possível buscar academias por página', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia Gelsiane ${i}`,
        description: null,
        phone: null,
        latitude: -14.4095261,
        longitude: -51.31668,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gelsiane',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Gelsiane 21' }),
      expect.objectContaining({ title: 'Academia Gelsiane 22' }),
    ])
  })
})
