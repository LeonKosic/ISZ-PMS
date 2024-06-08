import {  mysqlTable, bigint,text } from 'drizzle-orm/mysql-core';
import { users } from './users.js';

export const notification=mysqlTable('notification',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    user_id:bigint('user_id', { mode: 'number' }).notNull().references(()=>users.id),
    contents:text('contents'),
    
})