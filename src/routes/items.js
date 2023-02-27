const express = require('express')
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/items')
const router = express.Router()

router.get('/', getItems)
router.post('/', createItem)
router.put('/', updateItem)
router.delete('/', deleteItem)

module.exports = router
