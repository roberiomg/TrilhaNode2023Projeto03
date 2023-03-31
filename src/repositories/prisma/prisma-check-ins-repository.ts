import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_Id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_Id: userId,
      },
    })
    return count
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date') // Retorna primeiro momento de um dia.
    const endOfTheDay = dayjs(date).endOf('date') // Retorna último momento de um dia.

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_Id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // gte: maior ou igual
          lte: endOfTheDay.toDate(), // lte: menor ou igal
        },
      },
    })
    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id, // O nome checkin foi substituido po data para não dar conflito
      },
      data,
    })
    return checkIn
  }
}
