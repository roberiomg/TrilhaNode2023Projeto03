import { FetchUserCkeckInsHistoryUseCase } from '../fetch-user-check-ins-historyUseCase'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCkeckInsHistoryUseCase(checkInsRepository)

  return useCase
}
