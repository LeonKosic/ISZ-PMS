import { relations } from "drizzle-orm";
import { users } from "../users.js";
import { follow } from "../follow.js";

export const userRelations = relations(users,({many})=>({
    followers:many(follow, {relationName:"follower",foreignKey:"followed_id"}),
    following:many(follow, {relationName:"follower",foreignKey:"follower_id"}),
}))