const express = require('express')
const { savePucharse, getPucharses } = require('../controllers/pucharses')

const router = express.Router()

//Private routes
router.route('/').post(savePucharse)
router.route('/:email').get(getPucharses)

module.exports = router
