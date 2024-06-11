import {  mysqlTable, bigint,varchar , boolean } from 'drizzle-orm/mysql-core';
import { commit } from './commit.js';
import { file } from './file.js';

export const commited_files=mysqlTable('commited_files',{
    commitId:bigint('commitId', { mode: 'number' }).references(()=>commit.id),
    fileId:bigint('fileId', { mode: 'number' }).references(()=>file.id),
    deleted:boolean('deleted')
})