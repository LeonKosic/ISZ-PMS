import { index, mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { users } from './users.js';

export const follow = mysqlTable('follow', {
    follower_id: bigint('follower_id', { mode: 'number' }).notNull().references(()=>users.id),
    following_id: bigint('following_id', { mode: 'number' }).notNull().references(()=>users.id),

}, (users) => ({
  nameIdx: index('name_idx').on(users.follower_id),
}));
