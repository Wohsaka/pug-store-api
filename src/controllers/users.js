const db = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const createUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    })
  }

  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
      email,
      hashedPassword,
    ])
    const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).json({ success: true, data: { accessToken: token } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const login = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    })
  }

  try {
    const { email, password } = req.body
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect Email or Password!' })
    }
    const match = await bcrypt.compare(password, user.rows[0].password)
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect Email or Password!' })
    }

    const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
      success: true,
      message: `User ${user.rows[0].email} loged!`,
      data: {
        accessToken: token,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  createUser,
  login,
}
