import express from 'express'
import ObjectsController from '../controllers/objects.mjs'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Objects home page')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const object = ObjectsController.getById(id)
  res.status(200).json(object)
})

export default router
