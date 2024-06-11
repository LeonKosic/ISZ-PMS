import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { post } from './post.js';
import { commit } from './commit.js';

export const project=mysqlTable('project',{
    id:bigint('id', { mode: 'number' }).primaryKey().references(()=>post.id),
    head: bigint('head', { mode: 'number' }).references(()=>commit.id),
    
})