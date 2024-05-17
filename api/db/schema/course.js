import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';

export const course=mysqlTable('course',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name:varchar('name',{ length: 256 }),
    password: varchar("password", {length:256}),
    deleted: boolean('deleted')
})