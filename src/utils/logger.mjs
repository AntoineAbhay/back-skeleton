import winston from 'winston'

const { createLogger, format } = winston
const { combine, timestamp, colorize, printf } = format

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), winston.format.json()),
  defaultMeta: { service: 'back-skeleton' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  exitOnError: false,
})

const customFormat = printf(
  ({ level, message, timestamp, method, path, ...rest }) => {
    const { service, ...noMeta } = rest
    const restToLog =
      noMeta && Object.entries(noMeta).length !== 0
        ? JSON.stringify(noMeta)
        : ''
    if (method && path) {
      return `${timestamp} ${level}: ${message} ${method} ${path} ${restToLog}`
    }
    return `${timestamp} ${level}: ${message} ${restToLog}`
  }
)

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), customFormat),
      handleExceptions: true,
    })
  )
}

export default logger
