import { relations } from "drizzle-orm";
import { project } from "../project.js";
import { users } from "../users.js";

export const projectRelations = relations(project,({many})=>({
    owner:one(users, {fields:[project.owner_id],references:[users.id]}),
    owner:many(project) 
}));