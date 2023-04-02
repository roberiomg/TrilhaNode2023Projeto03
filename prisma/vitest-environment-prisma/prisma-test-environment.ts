import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient() // Crai a conexão com banco de dados.

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environmente variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

// postgresql://docker:docker@localhost:5432/academia?schema=public

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Consigo fazer execução de comandos antes dos testes
    const schema = randomUUID()
    // console.log(generateDatabaseURL(schema))
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy') // Utilizamos o deploy pois ele pula a etapa de comparar o banco com os schema, pegando somente as migrations que já estão prontas.

    return {
      async teardown() {
        // Consigo fazer execução de comandos depois dos testes
        // console.log('Teardown')

        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "$(schema)" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
