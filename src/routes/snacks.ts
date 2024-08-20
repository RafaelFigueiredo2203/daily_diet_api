import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../utils/prisma'

export async function Sancks(app: FastifyInstance) {
  app.post('/snacks', async (request, reply) => {
    const snacksBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      createdAt: z.date(),
      updated_at: z.date().optional(),
      isDiet: z.boolean(),
    })

    const { name, description, isDiet, createdAt } = snacksBodySchema.parse(
      request.body,
    )

    await prisma.snack.create({
      data: {
        name,
        userId,
        description,
        isDiet,
        createdAt,
      },
    })
  })
}
