import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../utils/prisma'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { email, name, password } = createUserBodySchema.parse(request.body)

    await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })

    return reply.status(201).send()
  })
}
