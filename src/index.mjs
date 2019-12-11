import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import logger from './utils/logger.mjs'
import objectsRouter from './routes/objects.mjs'

import config from './config'
const PORT = config.get('port')

const app = express()
app.use(helmet()) // For security headers
app.use(bodyParser.json())
app.use((req, _res, next) => {
  logger.info('API-call', { method: req.method, path: req.path })
  next()
})

app.use('/objects', objectsRouter)

app.get('/status', (_req, res) => {
  res.status(200).json({ status: 'healthy' })
})

app.post('/error', (req, _res, next) => {
  try {
    throw Error(req.body.message)
  } catch (e) {
    next(e)
  }
})

app.use((req, res) => {
  logger.warn('Not-found', { method: req.method, path: req.path, ip: req.ip })
  res.status(404).json({ success: false, reason: 'Not Found' })
})

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ success: false })
}

app.use(errorHandler)

app.listen(PORT, () => {
  logger.info('Back-skeleton app started', { port: PORT })
})
