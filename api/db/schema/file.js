import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';

export const file=mysqlTable('file',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    path:varchar('path', { length: 256 }).notNull(),
    isDeleted:boolean('isDeleted', { mode: 'boolean' }).notNull().default(false),
    
})