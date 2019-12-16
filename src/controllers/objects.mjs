import logger from '../utils/logger'
import db from '../utils/db'

const collection = db.get('objects')

class ObjectsController {
  static async getById(id) {
    try {
      const object = await collection.findOne({ id: id })
      return object
    } catch (e) {
      logger.error('controllers ObjectsController getById', {
        error: e.message,
      })
    }
  }
}

export default ObjectsController
