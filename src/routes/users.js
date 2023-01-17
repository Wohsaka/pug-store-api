const express = require('express')
const { createUser, login } = require('../controllers/users')
const { body } = require('express-validator')

const router = express.Router()

router.post(
  '/',
  body('email').isEmail().isLength(1),
  body('password').isLength(5).isAlphanumeric(),
  createUser
)

router.post(
  '/login',
  body('email').isLength(1),
  body('password').isLength(1),
  login
)

module.exports = router
