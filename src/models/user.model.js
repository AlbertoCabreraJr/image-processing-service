const { query } = require("../config/db");

const createUser = async (user) => {
  const { email, password } = user;
  const result = await query(
    `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *
    `,
    [email, password]
  )
  return result.rows[0]; 
}

const getUserById = async (userId) => {
  const result = await query(
    `SELECT * FROM users WHERE id = $1`,
    [userId]
  )
  return result.rows[0];
}

const getUserByEmail = async (email) => {
  const result = await query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  )
  return result.rows[0];
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
} 