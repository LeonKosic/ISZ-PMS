import { mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { category } from './category.js';
import { post } from './post.js';

export const post_category = mysqlTable('post_category', {
    category_id: bigint('category_id', { mode: 'number' }).notNull().references(()=>category.id),
    post_id: bigint('post_id', { mode: 'number' }).notNull().references(()=>post.id),
});