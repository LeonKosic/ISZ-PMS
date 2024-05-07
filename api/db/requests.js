import { index, int, mysqlTable, bigint, varchar, tinyint, boolean } from 'drizzle-orm/mysql-core';
import { roles } from './schema/roles.js';



export const requests = mysqlTable('requests', {
  user_name: varchar('user_name', { length: 256 }),
  name: varchar('name', { length: 256 }),
  email: varchar("email", {length: 256}),
  password: varchar("password", {length:256}),
  deleted: boolean('deleted'),
  role_id: bigint('role_id', { mode: 'number' }).notNull().references(()=>roles.role_id),
  is_activ:boolean('is_activ')

})