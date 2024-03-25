//var dotenv = require("dotenv").config();
export default {
  schema: './db/schema/schema.js',
  out: './db/drizzle',
  driver: 'mysql2', 
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
}