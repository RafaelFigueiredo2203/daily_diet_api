import bcrypt from 'bcryptjs'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../utils/prisma'

export async function Authenticate(app: FastifyInstance) {
  app.post('/sign-in', async (request: FastifyRequest, reply: FastifyReply) => {
    const authenticateUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateUserBodySchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return reply.status(401).send({ error: 'Usuário não encontrado' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return reply.status(401).send({ error: 'Email ou senha inválida' })
    }

    const token = await reply.jwtSign({
      sign: { id: user.id, email: user.email },
    })

    reply.status(200).send(token)
  })
}
