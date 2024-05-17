import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';

export const partners=mysqlTable('partners',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    domain:varchar('name',{ length: 256 }),
    deleted: boolean('deleted')
})