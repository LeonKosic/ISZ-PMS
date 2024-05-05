import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';

export const project=mysqlTable('project',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name:varchar('name',{ length: 256 }),
    deleted: boolean('deleted')
})