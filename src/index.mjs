import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import objectsRouter from './routes/objects.mjs'

const app = express()
app.use(helmet()) // For security headers
app.use(bodyParser.json())

app.all('/', (req, res, next) => {
  console.log('Accessing the API..')
  next()
})

app.use('/objects', objectsRouter)

app.get('/status', (req, res) => {
  res.status(200).json({ status: 'healthy' })
})

app.post('/error', (req, res, next) => {
  try {
    throw Error(req.body.message)
  } catch (e) {
    next(e)
  }
})

const errorHandler = (err, req, res, next) => {
  console.error('error:', err.message)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ success: false })
}

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Back-skeleton app listening on port 3000!')
})
