import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserCkeckInsHistoryUseCase } from './fetch-user-check-ins-historyUseCase'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCkeckInsHistoryUseCase

describe('Buscar histórico de Checkins do usuário Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCkeckInsHistoryUseCase(checkInsRepository)
  })

  it('Deve ser possível buscar o histórico de checkins', async () => {
    await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    await checkInsRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-01' }),
      expect.objectContaining({ gym_Id: 'gym-02' }),
    ])
  })

  it('Deve ser possível buscar o histórico de checkins por página', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_Id: `gym-${i}`,
        user_Id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-21' }),
      expect.objectContaining({ gym_Id: 'gym-22' }),
    ])
  })
})
