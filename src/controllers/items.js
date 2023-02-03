const db = require('../database/db')

const getItems = async (req, res) => {
  try {
    const items = await db.query('SELECT * FROM items')
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
