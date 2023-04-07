import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCkeckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCkeckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCkeckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCkeckInsHistoryUseCaseRequest): Promise<FetchUserCkeckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
