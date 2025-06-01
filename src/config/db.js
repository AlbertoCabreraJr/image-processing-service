const { Pool } = require('pg');

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    const client = await db.connect();
    console.log("✅ Connected to database");
    client.release();
  } catch (error) {
    console.error("❌ Error connecting to database", error);
    process.exit(1);
  }
};

const query = async (text, params) => {
  const start = Date.now();
  const res = await db.query(text, params);
  const duration = Date.now() - start;
  console.log("Query executed in", duration, "ms");
  return res;
}

module.exports = {
  connectDB,
  query,
}