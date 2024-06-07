import { relations } from "drizzle-orm";
import { post } from "../post.js";
import { users } from "../users.js";

export const postRelations = relations(post,({many, one})=>({
    owner:one(users, {fields:[post.owner_id],references:[users.id]}),
}));