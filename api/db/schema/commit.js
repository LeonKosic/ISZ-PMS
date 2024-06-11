import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { project } from './project.js';

export const commit=mysqlTable('commit',{
    id:bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    project: bigint('project', { mode: 'number' }).references(()=>project.id),
})