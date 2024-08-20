import { app } from './app'

app
  .listen({
    host: `localhost`,
    port: 3333,
  })
  .then(() => {
    console.log('HTTP SERVER RUNNING')
  })
