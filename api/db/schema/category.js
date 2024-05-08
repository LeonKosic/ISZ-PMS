import {  mysqlTable, tinyint,varchar , boolean } from 'drizzle-orm/mysql-core';

export const category=mysqlTable('category',{
    category_id:tinyint('category_id', { mode: 'number' }).primaryKey().autoincrement(),
    category_name:varchar('category_name',{ length: 256 }),
    deleted: boolean('deleted').default(0)
})