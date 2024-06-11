import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { project } from './project.js';

export const file=mysqlTable('file',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    path:varchar('path', { length: 256 }).notNull(),
    isDeleted:boolean('isDeleted', { mode: 'boolean' }).notNull().default(false),
    project:bigint('project', { mode: 'number' }).notNull().references(()=>project.id),
    parent: bigint('parent', { mode: 'number' }).references(()=>file.id).default(null),
    
})