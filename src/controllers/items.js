const db = require('../database/db')
const jwt = require('jsonwebtoken')

const getItems = async (req, res) => {
  const { category, query } = req.query
  let items
  try {
    if (category && !query) {
      items = await db.query('SELECT * FROM items WHERE LOWER(category) = $1', [
        category.toLowerCase(),
      ])
    } else if (!category && query) {
      items = await db.query(
        `SELECT * FROM items WHERE LOWER(product_name) LIKE '%' || $1 || '%'`,
        [query.toLowerCase()]
      )
    } else if (category && query) {
      items = await db.query(
        `SELECT * FROM items WHERE category = $1 AND LOWER(product_name) LIKE '%' || $2 || '%'`,
        [category, query.toLowerCase()]
      )
    } else {
      items = await db.query('SELECT * FROM items')
    }
    if (items.rows.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No items found!' })
    }
    res.status(200).json({ success: true, data: items.rows })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const createItem = async (req, res) => {
  const { name, price, category, id, img, description } = req.body
  const token = req.headers.authorization
  let jwtError = true

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error) => (jwtError = error)
  )

  if (jwtError) {
    return res.status(401).json({ success: false, message: jwtError.message })
  }

  try {
    await db.query(
      'INSERT INTO items (product_name, product_price, category, product_id, product_img, product_description) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, parseFloat(price).toFixed(2), category, id, img, description]
    )
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const updateItem = async (req, res) => {
  const { name, price, category, id, img, description } = req.body
  const { itemId } = req.query
  const token = req.headers.authorization
  let jwtError = true

  if (!itemId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide item ID' })
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error) => (jwtError = error)
  )

  if (jwtError) {
    return res.status(401).json({ success: false, message: jwtError.message })
  }
  try {
    await db.query(
      'UPDATE items SET product_name = $1, product_price = $2, category = $3, product_id = $4, product_img = $5, product_description = $6 WHERE id = $7',
      [
        name,
        parseFloat(price).toFixed(2),
        category,
        id,
        img,
        description,
        itemId,
      ]
    )
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const deleteItem = async (req, res) => {
  const token = req.headers.authorization
  const { itemId } = req.query

  if (!itemId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide item ID' })
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error) => (jwtError = error)
  )

  if (jwtError) {
    return res.status(401).json({ success: false, message: jwtError.message })
  }

  try {
    await db.query('DELETE FROM items WHERE id = $1', [itemId])
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
}
