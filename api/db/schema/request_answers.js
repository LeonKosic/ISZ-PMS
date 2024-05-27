import { index, mysqlTable, bigint, primaryKey } from 'drizzle-orm/mysql-core';
import {request} from './request.js';
import { project } from './project.js';

export const request_answers = mysqlTable('request_answers', {
    project: bigint('project', { mode: 'number' }).notNull().references(()=>project.id),
    request: bigint('request', { mode: 'number' }).notNull().references(()=>request.id),

}, (request_answers) => ({
  pk: primaryKey({columns: [request_answers.project, request_answers.request]})
}));
