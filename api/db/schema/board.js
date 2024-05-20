import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';

export const board=mysqlTable('board',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    
})