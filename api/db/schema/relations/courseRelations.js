import { relations } from "drizzle-orm";
import { users } from "../users.js";
import { course } from "../course.js";

export const courseRelations = relations(course,({one,many})=>({
    owner_id:one(users, {fields:[course.owner_id],references:[users.id]}),
    teachers:many(users),
    students:many(users)

}));