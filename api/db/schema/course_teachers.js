import { mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { course } from './course.js';
import {users} from './users.js';

export const course_teachers = mysqlTable('course_teachers', {
    course_id: bigint('course_id', { mode: 'number' }).notNull().references(()=>course.id),
    teacher_id: bigint('teacher_id', { mode: 'number' }).notNull().references(()=>users.id)
});