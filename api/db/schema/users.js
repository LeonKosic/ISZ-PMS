import { index, int, mysqlTable, bigint, varchar, tinyint, boolean } from 'drizzle-orm/mysql-core';


const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  user_name: varchar('user_name', { length: 256 }),
  name: varchar('name', { length: 256 }),
  email: varchar("email", {length: 256}),
  password: varchar("password", {length:256}),
  deleted: boolean('deleted').default(0)

}, (users) => ({
  nameIdx: index('name_idx').on(users.name),
}));

export {users}