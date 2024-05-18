import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { users } from './users.js';

export const course=mysqlTable('course',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    name:varchar('name',{ length: 256 }),
    password: varchar("password", {length:256}),
    owner_id:  bigint('owner_id', { mode: 'number' }).notNull().references(()=>users.id),
    deleted: boolean('deleted')
})