const db = require('../database/db')
const jwt = require('jsonwebtoken')

const savePucharse = async (req, res) => {
  const { email, total, items } = req.body
  const token = req.headers.authorization
  let jwtError = true

  if ((!email, !total, !items)) {
    return res.status(400).json({
      success: false,
      message: 'Error: email, total or items are invalid!',
    })
  }

  if (token === null) {
    return res
      .status(401)
      .json({ success: false, message: 'No access token provided' })
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error) => (jwtError = error)
  )

  if (jwtError) {
    return res.status(403).json({ success: false, message: jwtError.message })
  }

  try {
    await db.query(
      'INSERT INTO pucharses (email, total, items) VALUES ($1, $2, $3)',
      [email, total, items]
    )
    res.status(201).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const getPucharses = async (req, res) => {
  const { email } = req.params
  const token = req.headers.authorization
  let jwtError = true

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Error: ivalid email!',
    })
  }

  if (token === null) {
    return res
      .status(401)
      .json({ success: false, message: 'No access token provided' })
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error) => (jwtError = error)
  )

  if (jwtError) {
    return res.status(403).json({ success: false, message: jwtError.message })
  }

  try {
    const pucharses = await db.query(
      'SELECT * FROM pucharses WHERE email = $1',
      [email]
    )
    res.status(201).json({ success: true, data: { pucharses: pucharses.rows } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  savePucharse,
  getPucharses,
}
