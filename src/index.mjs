import express from 'express'

import objectsRouter from './routes/objects.mjs'

const app = express()

app.all('/', (req, res, next) => {
  console.log('Accessing the API..')
  next()
})

app.use('/objects', objectsRouter)

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'healthy' })
})

app.listen(3000, () => {
  console.log('Back-skeleton app listening on port 3000!')
})
