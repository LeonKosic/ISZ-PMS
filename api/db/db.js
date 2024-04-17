import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import schema from './schema/schema.js';
import 'dotenv/config';

export const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: true,
});

export const db = drizzle(connection, { schema, mode: "default" });