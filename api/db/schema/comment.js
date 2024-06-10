import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import {post} from './post.js';

export const comment = mysqlTable('comment', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  body: varchar('body', { length: 1000 }).notNull(),
  user: bigint('user', { mode: 'number' }).notNull().references(() => users.id),
  post: bigint('post', { mode: 'number' }).notNull().references(() => post.id),
})