import { mysqlTable, bigint } from 'drizzle-orm/mysql-core';
import { users } from './users.js';
import { course } from './course.js';

export const enrolled = mysqlTable('enrolled', {
    student_id: bigint('student_id', { mode: 'number' }).notNull().references(()=>users.id),
    course_id: bigint('course_id', { mode: 'number' }).notNull().references(()=>course.id),

})