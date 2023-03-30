import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validade-check-insUseCase'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validação do Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Deve ser possível validar o check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('Não deve ser possível validar checkin inexistente', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-checkin-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Não deve ser possível validar um checkin após 20 minutos de sua criação', async () => {
    vi.setSystemTime(new Date(2023, 0, 25, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    const vinteUmMinutosEmMilessegundos = 1000 * 60 * 21

    vi.advanceTimersByTime(vinteUmMinutosEmMilessegundos)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
