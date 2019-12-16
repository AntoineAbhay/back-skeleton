import monk from 'monk'
import config from '../config'

const DB_NAME = config.get('db.name')
const DB_URL = config.get('db.url')

const connectionString = `${DB_URL}/${DB_NAME}` // Connection URL
const db = monk(connectionString)

export default db
