import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { commit } from './commit';
import { file } from './file';

export const commited_files=mysqlTable('commited_files',{
    commitId:bigint('id', { mode: 'number' }).primaryKey().references(()=>commit.id),
    fileId:bigint('id', { mode: 'number' }).primaryKey().references(()=>file.id),
})