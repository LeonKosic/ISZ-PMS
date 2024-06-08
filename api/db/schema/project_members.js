import { index, mysqlTable, bigint, primaryKey } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import { project } from './project.js';

export const project_members = mysqlTable('project_members', {
    project: bigint('project', { mode: 'number' }).notNull().references(()=>project.id),
    user: bigint('user', { mode: 'number' }).notNull().references(()=>users.id),

}, (users) => ({
  pk: primaryKey({columns: [users.project, users.user]})
}));
