import { index, int, mysqlTable, bigint, varchar, tinyint, boolean } from 'drizzle-orm/mysql-core';
import {roles} from "./roles.js"


const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  user_name: varchar('user_name', { length: 256 }),
  name: varchar('name', { length: 256 }),
  email: varchar("email", {length: 256}),
  password: varchar("password", {length:256}),
  deleted: boolean('deleted'),
  role_id: bigint('role_id', { mode: 'number' }).notNull().references(()=>roles.role_id),
  is_active:boolean('is_active')

}, (users) => ({
  nameIdx: index('name_idx').on(users.name),
}));

export {users}