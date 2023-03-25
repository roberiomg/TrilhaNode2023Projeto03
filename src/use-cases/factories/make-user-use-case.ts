import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserUseCase } from '../userUseCase'

export function makeUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const userUseCase = new UserUseCase(usersRepository)

  return userUseCase
}
