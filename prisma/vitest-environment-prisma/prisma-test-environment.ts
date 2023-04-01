import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Consigo fazer execução de comandos antes dos testes
    console.log('Setup')

    return {
      async teardown() {
        // Consigo fazer execução de comandos depois dos testes
        console.log('Teardown')
      },
    }
  },
}
