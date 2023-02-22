const express = require('express')
const { getItems, createItem, updateItem } = require('../controllers/items')
const router = express.Router()

router.get('/', getItems)
router.post('/', createItem)
router.put('/', updateItem)

module.exports = router
