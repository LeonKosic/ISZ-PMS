import { relations } from "drizzle-orm";
import { course } from "../course.js";
import { users } from "../users.js";
import { course_teachers } from "../course_teachers.js";

export const course_teachersRelations = relations(course_teachers,({many})=>({
    course_id:many(course, {fields:[course_teachers.course_id],references:[course.id]}),
    teacher_id:many(users, {fields:[course_teachers.teacher_id],references:[users.id]})

}));