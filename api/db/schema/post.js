import { mysqlTable, bigint, varchar, boolean, int } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import { board } from './board.js';


// Types: 0: post, 1: project, 2: request

export const post = mysqlTable('post', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  title: varchar('name', { length: 256 }),
  body: varchar('body', { length: 2560 }),
  owner_id: bigint('owner_id', { mode: 'number' }).notNull().references(() => users.id),
  deleted: boolean('deleted'),
  type: int('type', { mode: 'number' }).notNull().default(0),
  parent_id: bigint('parent_id', { mode: 'number' }).references(() => board.id),
  board_id: bigint('board_id', { mode: 'number' }).references(() => board.id),
  isFeatureRequest: boolean('isFeatureRequest').default(false),
})