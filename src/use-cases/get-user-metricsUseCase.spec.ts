import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metricsUseCase'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Obter métricas do usuário Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('Deve ser possível buscar o número de checkins do usuário', async () => {
    await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    await checkInsRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
