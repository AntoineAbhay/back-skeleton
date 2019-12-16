import convict from 'convict'

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    name: {
      doc: 'The database name.',
      format: String,
      default: 'skeleton',
    },
    url: {
      doc: 'The database url.',
      format: '*',
      default: 'mongodb://localhost:27017',
    },
  },
})

// Load environment dependent configuration
var env = config.get('env')
config.loadFile('./src/config/' + env + '.json')

// Perform validation
config.validate({ allowed: 'strict' })

export default config
