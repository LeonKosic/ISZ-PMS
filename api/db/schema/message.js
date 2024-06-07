import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { users } from './users.js';

export const message=mysqlTable('message',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    content:varchar('content', { length: 256 }).notNull(),
    sender:bigint('sender', { mode: 'number' }).notNull().references(()=>users.id),
    receiver:bigint('receiver', { mode: 'number' }).notNull().references(()=>users.id),
    
})