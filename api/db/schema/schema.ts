// import { index, int, mysqlTable, bigint, varchar } from 'drizzle-orm/mysql-core';

// export const users = mysqlTable('users', {
//   id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
//   name: varchar('name', { length: 256 }),
//   email: varchar("email", {length: 256}),
//   password: varchar("password", {length:256}),
// }, (users) => ({
//   nameIdx: index('name_idx').on(users.name),
// }));

import {users} from "./users"

export {users};
