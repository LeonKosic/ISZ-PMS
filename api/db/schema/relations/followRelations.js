import { relations } from "drizzle-orm";
import { users } from "../users.js";
import { follow } from "../follow.js";

export const followRelations = relations(follow,({one})=>({
    follower:one(users, {fields:[follow.follower_id],references:[users.id]}),
    following:one(users, {fields:[follow.following_id],references:[users.id]}),

}));
