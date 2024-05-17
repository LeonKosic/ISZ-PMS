import { mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { category } from './category.js';
import { project } from './project.js';

export const project_category = mysqlTable('project_category', {
    category_id: bigint('category_id', { mode: 'number' }).notNull().references(()=>category.id),
    project_id: bigint('project_id', { mode: 'number' }).notNull().references(()=>project.id),
});