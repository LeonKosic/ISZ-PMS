import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { post } from './post.js';

export const project=mysqlTable('project',{
    id:bigint('id', { mode: 'number' }).primaryKey().references(()=>post.id),
    
})