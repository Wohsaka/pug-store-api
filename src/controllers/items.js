const db = require('../database/db')

const getItems = async (req, res) => {
  const { category, query } = req.query
  let items
  try {
    if (category && !query) {
      items = await db.query('SELECT * FROM items WHERE category = $1', [
        category,
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

module.exports = {
  getItems,
}
