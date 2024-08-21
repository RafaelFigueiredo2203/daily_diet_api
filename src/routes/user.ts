import fastifyJwt from '@fastify/jwt'
import bcrypt from 'bcryptjs'
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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return reply.status(400).send({ error: 'Usuário já existe' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return reply.status(201).send()
  })

  app.get(
    '/profile',
    { preValidation: [fastifyJwt.authenticate] },
    async (request, reply) => {
      const user = await prisma.user.findUnique({
        where: { id: user?.id },
      })

      if (!user) {
        return reply.status(404).send({ error: 'Usuário não encontrado' })
      }

      reply.send({ user })
    },
  )
}
