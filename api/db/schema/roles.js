import {  mysqlTable, bigint,varchar } from 'drizzle-orm/mysql-core';

export const roles= mysqlTable('role',{
    role_id: bigint('role_id', { mode: 'number' }).primaryKey().autoincrement(),
    role_name:varchar('role_name', { length: 256 })
})