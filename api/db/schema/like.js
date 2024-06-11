import { mysqlTable, bigint, varchar, boolean, primaryKey, int } from 'drizzle-orm/mysql-core';
import { post } from './post.js';
import { users } from './users.js';

export const like = mysqlTable('like', {
  post: bigint('id', { mode: 'number' }).references(() => post.id),
  user: bigint('user', { mode: 'number' }).references(() => users.id),
  status: int('status', { mode: 'number' }),

}, (table) => {
  return { pk: primaryKey({ columns: [table.post, table.user] }) }
})