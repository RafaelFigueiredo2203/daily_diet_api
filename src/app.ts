import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import { env } from './env'
import { Authenticate } from './routes/authenticate'
import { userRoutes } from './routes/user'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(userRoutes)
app.register(Authenticate)
